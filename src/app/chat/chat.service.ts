import { Injectable } from '@angular/core';
import { Message } from './message';
import { LocalstorageService } from '../common-services/localstorage.service';
import { BehaviorSubject, Observable, of, from, GroupedObservable } from 'rxjs';
import { groupBy, mergeMap, reduce, map, merge, scan } from 'rxjs/operators';
import { ChatItem } from './chat-item';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatSubject: BehaviorSubject<ChatItem[]> = new BehaviorSubject<ChatItem[]>(this._getChatItems());
  constructor(private localstorageService: LocalstorageService) { }


  chat(): Observable<ChatItem[]> {
    return this.chatSubject.asObservable();
  }

  sendMessage(message: Message) {
    let messages: Message[] = this.getMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    this.chatSubject.next(this._getChatItems());
  }

  getMessages(): Message[] {
    let messages: Message[] = this.localstorageService.getArrayFromJson<Message>('messages');
    return messages;
  }

  removeMessage() {

  }

  editMessage() {

  }

  private _getChatItems(): ChatItem[] {
    let chatItems: ChatItem[] = [];
    let messages: Message[] = this.getMessages()

    from(messages)
      .pipe(
        groupBy(p => { return p.date }),
        mergeMap(group$ =>
          group$.pipe(reduce<Message | string>((acc, cur) => [...acc, cur], [`${group$.key}`]))
        ),
        map(arr => {
          return {
            date: arr[0] as string,
            values: arr.slice(1).map(x => x as Message)
          }
        }))
      .subscribe((x) => { chatItems.push(x) })

    return chatItems;
  }

}
