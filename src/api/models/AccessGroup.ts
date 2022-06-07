export enum AccessGroupScope {
  USER = 'USER',
  ACCOUNT = 'ACCOUNT',
  GLOBAL = 'GLOBAL'
}

export type AccessGroup = {
  id: number;
  name: string;
  scope: AccessGroupScope;
  userEmail: string;
  userId: number;
}
