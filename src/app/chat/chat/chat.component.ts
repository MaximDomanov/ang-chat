import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/common-services/user.service';
import { User } from 'src/app/domain/user';
import { fromEvent, Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { Message } from '../message';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatInputRef') chatInputRef: ElementRef;
  @ViewChild('chatBodyRef') chatBodyRef: ElementRef;

  date = Date.now();
  chatInput: FormControl = new FormControl('', Validators.required);
  authorizedUser: User;
  isCurrentUserTyping: boolean = false;
  chatInputKeyDown: Subscription;


  constructor(
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatService.chat().subscribe(x => console.log(x));
    this.authorizedUser = this.userService.getAuthorizedUser();
  }

  ngAfterViewInit() {
    this.chatBodyRef.nativeElement.scrollTop = this.chatBodyRef.nativeElement.scrollHeight;

    fromEvent(this.chatInputRef.nativeElement, 'keydown')
      .pipe(
        tap(() => this.isCurrentUserTyping = true),
        debounceTime(1000),
      )
      .subscribe(() => this.isCurrentUserTyping = false);
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
