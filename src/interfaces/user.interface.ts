import { UID } from 'types-ddd';

export interface User {
  id: UID,
  email: string,
  password: string,
  confirmPassword: string
};

export interface DatabaseUser extends Omit<User, 'confirmPassword'> { }