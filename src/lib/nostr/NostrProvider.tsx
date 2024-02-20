import { NDKNip46Signer, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { nip19 } from "nostr-tools";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { messageBackground } from "~lib/chrome";
import { useNostrStore } from "~lib/zustand/nostr";
import {
  UserIdentifierType,
  type UserIdentifier,
} from "~types/nostr/UserIdentifier";

import { _createNostrKey } from "./createNostrKey";
import { _getUserFromStorage } from "./getUserFromStorage";
import NostrClass from "./NostrClass";
import { bytesToHex } from "@noble/hashes/utils";

interface NostrContext {
  nostr: NostrClass;
  createNostrUser: (name: string) => Promise<void>;
  signInNsec: (nsec: string) => Promise<void>;
  signInNostrLogin: () => Promise<void>;
}

const NostrContext = createContext<NostrContext>({
  nostr: undefined,
  createNostrUser: undefined,
  signInNsec: undefined,
  signInNostrLogin: undefined,
});

export const NostrProvider = ({ children }: PropsWithChildren<object>) => {
  const [nostr, setNostr] = useState<NostrClass>(undefined);
  const setUser = useNostrStore((state) => state.setUser);

  async function initNostrClass() {
    try {
      const _nostr = new NostrClass({});
      await _nostr.init();
      return _nostr;
    } catch (e) {
      console.error(`[NostrProvider] initNostrClass - ${e}`);
    }
  }

  async function createNostrUser(name: string) {
    const key = await _createNostrKey(nostr);
    const privkey = bytesToHex(key.sk);

    //@ts-ignore
    const signer = new NDKPrivateKeySigner(privkey);

    await nostr.init(signer);

    await nostr.updateUserName(key.pk, name);

    const user: UserIdentifier = {
      pubkey: key.pk,
      nsec: key.nsec,
      npub: key.npub,
      sk: privkey,
      type: UserIdentifierType.PrivateKey,
    };
    setUser(user);

    //@ts-ignore
    await messageBackground("storage/set-user", user);
  }

  async function signInNsec(nsec: string) {
    const decodedPrivkey = nip19.decode(nsec);
    //@ts-ignore
    const privkey = bytesToHex(decodedPrivkey.data);

    const signer = new NDKPrivateKeySigner(privkey);
    const _user = await signer.user();

    if (_user) {
      await nostr.init(signer);

      const user: UserIdentifier = {
        pubkey: _user.pubkey,
        nsec: nsec,
        sk: privkey,
        npub: _user.npub,
        type: UserIdentifierType.PrivateKey,
      };
      setUser(user);

      //@ts-ignore
      await messageBackground("storage/set-user", user);

      load();
    } else {
      setUser(undefined);
    }
  }

  async function signInNostrLogin() {
    let { init, launch } = await import("nostr-login");

    await init({ bunkers: "nsec.app,nsecbunker.com" });
    await launch({});
    const info = JSON.parse(window.localStorage.getItem("__nostrlogin_nip46"));

    const npub = await nip19.npubEncode(info.pubkey);

    const user: UserIdentifier = {
      pubkey: info.pubkey,
      sk: info.sk,
      npub: npub,
      type: UserIdentifierType.Nip46,
      relays: info.relay,
    };
    setUser(user);

    //@ts-ignore
    await messageBackground("storage/set-user", user);

    load();
  }

  async function load() {
    const _nostr = await initNostrClass();
    setNostr(_nostr);
    try {
      const _user = await _getUserFromStorage(_nostr);
      if (_user) {
        if (_user.type === UserIdentifierType.PrivateKey) {
          //@ts-ignore
          const signer = new NDKPrivateKeySigner(_user.sk);
          await _nostr.init(signer);
        }
        if (_user.type === UserIdentifierType.Nip46) {
          //@ts-ignore
          const localSigner = new NDKPrivateKeySigner(_user.sk);
          const remoteSigner = new NDKNip46Signer(
            _nostr.ndk,
            _user.pubkey,
            localSigner
          );
          remoteSigner.user().then(async (user) => {
            await remoteSigner.blockUntilReady();
            await _nostr.init(remoteSigner, _user.relays);
          });
        }
        setUser(_user);
      } else {
        setUser(undefined);
      }
    } catch (e) {
      console.error(`[NostrProvider] load - ${e}`);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <NostrContext.Provider
      value={{ nostr, createNostrUser, signInNsec, signInNostrLogin }}
    >
      {children}
    </NostrContext.Provider>
  );
};

export const useNostr = () => {
  const context = useContext(NostrContext);
  if (context === undefined) {
    throw new Error("Please import NostrProvider to use useNostr() hook");
  }
  return context;
};
