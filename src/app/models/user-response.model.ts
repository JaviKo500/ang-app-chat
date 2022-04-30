import { UserModel } from './user.model';
export interface UserResponse {
    ok:    boolean;
    user:  UserModel;
    token: string;
}