import { v4 as uuid } from 'uuid';

export class User {
    uuid: String;
    message_ids: [];

    constructor(public name: String = 'Default') {
        this.uuid = uuid();
    }

    toString(): String {
        return JSON.stringify(this);
    }
}