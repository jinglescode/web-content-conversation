import NDK, {
  NDKEvent,
  NDKPrivateKeySigner,
  type NDKFilter,
  NDKNip46Signer,
} from "@nostr-dev-kit/ndk";

import { EXPLICIT_RELAY_URLS } from "~constants/nostr";

export default class NostrClass {
  ndk: NDK;
  signer: NDKPrivateKeySigner;

  constructor({}: {}) {}

  public async init(
    signer?: NDKPrivateKeySigner | NDKNip46Signer,
    relays = []
  ) {
    try {
      const ndk = new NDK({
        explicitRelayUrls: EXPLICIT_RELAY_URLS,
        signer: signer,
      });
      for (const r of relays) ndk.addExplicitRelay(r, undefined);
      await ndk.connect();
      this.ndk = ndk;
      // if (signer) this.signer = signer;
    } catch (e) {
      console.error(`[NostrClass] init ${e}`);
    }
  }

  public async signAndPublishEvent(event: NDKEvent) {
    event.ndk = this.ndk;
    await this.ndk.publish(event);
  }

  public async fetchEvents(filter: NDKFilter) {
    return Array.from(await this.ndk.fetchEvents(filter));
  }

  public async signPublishEvent(event: NDKEvent) {
    if (this.ndk === undefined) return;
    event.ndk = this.ndk;

    await event.sign();
    await event.publish();

    return event;
  }

  public async updateUserName(pubkey: string, name: string) {
    if (this.ndk === undefined) return;

    const _user = this.ndk.getUser({
      hexpubkey: pubkey,
    });

    await _user.fetchProfile();

    if (_user.profile === undefined) {
      _user.profile = {};
    }
    _user.profile.name = name;

    await _user.publish();
  }

  public async updateProfileImage(pubkey: string, imageUrl: string) {
    if (this.ndk === undefined) return;

    const _user = this.ndk.getUser({
      hexpubkey: pubkey,
    });

    await _user.fetchProfile();

    if (_user.profile === undefined) {
      _user.profile = {};
    }
    _user.profile.image = imageUrl;

    await _user.publish();
  }
}
