import { v4 as uuid } from 'uuid';

export class User {
    uuid: String;
    message_ids: [];

    constructor(
        public name: String = 'Default',
        public profileImageUrl: String = "http://wotexpress.ru/wp-content/uploads/2018/03/ebEO3LUqif4.jpg") {
        this.uuid = uuid();
    }

    toString(): String {
        return JSON.stringify(this);
    }
}