import { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
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
import type { UserIdentifier } from "~types/nostr/UserIdentifier";

import { _createNostrKey } from "./createNostrKey";
import { _getUserFromStorage } from "./getUserFromStorage";
import NostrClass from "./NostrClass";

interface NostrContext {
  nostr: NostrClass;
  createNostrUser: (name: string) => Promise<void>;
  signInNsec: (nsec: string) => Promise<void>;
}

const NostrContext = createContext<NostrContext>({
  nostr: undefined,
  createNostrUser: undefined,
  signInNsec: undefined,
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

    //@ts-ignore
    const signer = new NDKPrivateKeySigner(key.sk);

    await nostr.init(signer);

    // const nostrUser = nostr.ndk.getUser({
    //   hexpubkey: key.pk
    // })

    // nostrUser.profile = {}
    // nostrUser.profile.name = name

    // await nostrUser.publish()

    await nostr.updateUserName(key.pk, name);

    const user: UserIdentifier = {
      pubkey: key.pk,
      nsec: key.nsec,
      npub: key.npub,
    };
    setUser(user);

    await messageBackground("storage/set-user", user);
  }

  async function signInNsec(nsec: string) {
    const privkey = nip19.decode(nsec).data as string;

    const signer = new NDKPrivateKeySigner(privkey);
    const _user = await signer.user();

    if (_user) {
      await nostr.init(signer);

      const user: UserIdentifier = {
        pubkey: _user.pubkey,
        nsec: nsec,
        npub: _user.npub,
      };
      setUser(user);

      await messageBackground("storage/set-user", user);
    }
  }

  useEffect(() => {
    async function load() {
      const _nostr = await initNostrClass();
      setNostr(_nostr);
      try {
        const _user = await _getUserFromStorage(_nostr);
        if (_user) {
          const privkey = nip19.decode(_user.nsec).data as string;
          const signer = new NDKPrivateKeySigner(privkey);
          await _nostr.init(signer);
        }
        setUser(_user);
      } catch (e) {
        console.error(`[NostrProvider] load - ${e}`);
      }
    }
    load();
  }, []);

  return (
    <NostrContext.Provider value={{ nostr, createNostrUser, signInNsec }}>
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
