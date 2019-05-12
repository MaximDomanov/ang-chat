import { User } from '../domain/user';
import { v4 as uuid } from 'uuid';

export class Message {
    uuid: String;
    dateTime: Number;
    date: String;

    constructor(public user: User, public text: String) {
        let date = new Date();
        this.uuid = uuid();
        this.dateTime = Date.now();
        this.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}