import { Injectable } from '@angular/core';
import { Message } from './message';
import { LocalstorageService } from '../common-services/localstorage.service';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { groupBy, mergeMap, reduce, map, merge, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this._getChat());
  constructor(private localstorageService: LocalstorageService) { }


  chat(): Observable<any> {
    return this.chatSubject.asObservable();
  }

  sendMessage(message: Message) {
    let messages: Message[] = this.getMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    this.chatSubject.next(this._getChat());
  }

  getMessages(): Message[] {
    let messages: Message[] = this.localstorageService.getArrayFromJson<Message>('messages');
    return messages;
  }

  removeMessage() {

  }

  editMessage() {

  }

  private _getChat() {
    let chat: any[] = [];
    let messages: any[] = this.getMessages()

    from(messages)
      .pipe(
        groupBy(p => p.date),
        mergeMap(group$ =>
          group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
        ),
        map(arr => {
          return { date: arr[0], values: arr.slice(1) }
        }))
      .subscribe((x) => { chat.push(x) })

    return chat;
  }

}
