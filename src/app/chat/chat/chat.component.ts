import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/common-services/user.service';
import { User } from 'src/app/domain/user';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { Message } from '../message';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PhoneSnackBarComponent } from '../chat-phone-snack/chat-phone-snack.component';
import importImages from 'src/app/import-images';
import { ShareSnackBarComponent } from '../chat-share-snack/chat-share-snack.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  @ViewChild('chatInputRef') chatInputRef: ElementRef;
  @ViewChild('chatBodyRef') chatBodyRef: ElementRef;

  importImages: Object = importImages;

  authorizedUser: User;
  choosedMessage: Message = null;
  snackBarDurationInSeconds: number = 5;
  isCurrentUserTyping: boolean = false;
  date: number = Date.now();
  chat: Observable<any>;
  chatInput: FormControl = new FormControl('', Validators.required);
  chatInputKeyDown: Subscription;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private snackBar: MatSnackBar
  ) { }

  trackByMessages(index: number, message: Message): string { return message.uuid; }

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
    if (!this.chatInput.value.trim()) {
      return;
    }
    let message: Message = new Message(this.authorizedUser, this.chatInput.value);
    this.chatService.sendMessage(message);
    this.chatInput.setValue('');
  }

  openPhoneSnackBar() {
    this.snackBar.openFromComponent(PhoneSnackBarComponent, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
  
  openShareSnackBar() {
    this.snackBar.openFromComponent(ShareSnackBarComponent, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}