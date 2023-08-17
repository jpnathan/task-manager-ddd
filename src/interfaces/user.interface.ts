import { UUID } from 'crypto';

export interface User {
  id: UUID,
  email: string,
  password: string,
};

export interface DatabaseUser extends Omit<User, 'confirmPassword'> { }