import { v4 as uuid } from 'uuid';

export class User {
    uuid: String;

    constructor(
        public name: String = 'Default',
        public profileImageUrl: String) {
        this.uuid = uuid();
    }

    toString(): String {
        return JSON.stringify(this);
    }
}