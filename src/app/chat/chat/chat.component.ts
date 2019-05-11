import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/common-services/user.service';
import { User } from 'src/app/domain/user';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { Message } from '../message';
import { FormControl, Validators } from '@angular/forms';
import importImages from 'src/app/import-images';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatInputRef') chatInputRef: ElementRef;
  @ViewChild('chatBodyRef') chatBodyRef: ElementRef;
  
  importImages: Object = importImages;

  date = Date.now();
  chatInput: FormControl = new FormControl('', Validators.required);
  authorizedUser: User;
  isCurrentUserTyping: boolean = false;
  chatInputKeyDown: Subscription;
  chat: Observable<any>;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chat = this.chatService.chat();
    this.authorizedUser = this.userService.getAuthorizedUser();
  }

  ngAfterViewInit() {
    fromEvent(this.chatInputRef.nativeElement, 'keydown')
      .pipe(
        tap(() => this.isCurrentUserTyping = true),
        debounceTime(1000),
      )
      .subscribe(() => this.isCurrentUserTyping = false);
  }

  ngAfterViewChecked() {
    this.chatBodyRef.nativeElement.scrollTop = this.chatBodyRef.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (!this.chatInput.value) {
      return;
    }
    let message: Message = new Message(this.authorizedUser, this.chatInput.value);
    this.chatService.sendMessage(message);
    this.chatInput.setValue('');
  }
}
