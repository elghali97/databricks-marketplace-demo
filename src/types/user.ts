export enum UserRole {
  CONSUMER = 'consumer',
  PROVIDER = 'provider',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar?: string;
}