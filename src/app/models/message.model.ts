export interface MessageModel {
    from:      string;
    to:        string;
    message?:   string;
    createdAt?: Date;
    updatedAt?: Date;
}