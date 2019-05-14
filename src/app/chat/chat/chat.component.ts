import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/common-services/user.service';
import { User } from 'src/app/domain/user';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { tap, debounceTime, delay } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { Message } from '../message';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PhoneSnackBarComponent } from '../chat-phone-snack/chat-phone-snack.component';
import { ShareSnackBarComponent } from '../chat-share-snack/chat-share-snack.component';
import { ChatMessageActionDialog } from '../chat-message-action-dialog/chat-message-action-dialog.component';
import importImages from 'src/app/import-images';
import { ChatItem } from '../chat-item';

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
  snackBarDurationInSeconds: number = 5;
  isCurrentUserTyping: boolean = false;
  date: number = Date.now();
  chatItems: Observable<ChatItem[]>;
  chatInput: FormControl = new FormControl('', Validators.required);
  chatInputKeyDown: Subscription;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  trackByMessages(index: number, message: Message): string { return message.uuid; }

  ngOnInit() {
    this.chatItems = this.chatService.chat();
    this.chatItems.pipe(delay(100)).subscribe(x=>{
      this.chatBodyRef.nativeElement.scrollTop = this.chatBodyRef.nativeElement.scrollHeight;
      
    })
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

  sendMessage() {
    if (!this.chatInput.value.trim()) {
      return;
    }
    let message: Message = new Message(this.authorizedUser, this.chatInput.value);
    this.chatService.sendMessage(message);
    this.chatInput.setValue('');
  }

  openMessageActionDialog(message: Message): void {
    if (message.user.uuid !== this.authorizedUser.uuid) {
      return;
    }

    const dialogRef = this.dialog.open(ChatMessageActionDialog, {
      width: '300px',
      data: { ...message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result - ', result);
    });
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