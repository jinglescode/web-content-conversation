export enum UserIdentifierType {
  PrivateKey,
}

export type UserIdentifier = {
  pubkey: string;
  nsec: string;
  npub: string;
  type: UserIdentifierType;
};
