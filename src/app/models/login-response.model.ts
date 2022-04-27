import { UserModel } from './user.model';
export interface LogInResponse {
    ok:    boolean;
    user:  UserModel;
    token: string;
}