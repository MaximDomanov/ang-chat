import { v4 as uuid } from 'uuid';

export class User {
    uuid: string;

    constructor(
        public name: string = 'Default',
        public profileImageUrl: string) {
        this.uuid = uuid();
    }

    toString(): string {
        return JSON.stringify(this);
    }
}