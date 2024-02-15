export enum UserIdentifierType {
  PrivateKey,
  Nip46
}

export type UserIdentifier = {
  pubkey: string;
  nsec?: string;
  sk: string|Uint8Array;
  npub: string;
  type: UserIdentifierType;
};
