import { UserModel } from './user.model';
export interface UsersResponse {
    ok:    boolean;
    users:  UserModel[];
    token: string;
}