import { MessageModel } from "./message.model";

export interface MessageResponse {
    ok:       boolean;
    messages: MessageModel[];
}


