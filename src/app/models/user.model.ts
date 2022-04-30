export interface UserModel {
    name:   string;
    email:  string;
    password?: string;
    online?: boolean;
    uid?:    string;
}