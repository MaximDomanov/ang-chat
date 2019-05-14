import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Message } from '../message';

@Component({
    selector: 'chat-message-action-dialog',
    templateUrl: 'chat-message-action-dialog.component.html',
    styleUrls: ['chat-message-action-dialog.component.scss']
})
export class ChatMessageActionDialog {

    constructor(
        public dialogRef: MatDialogRef<ChatMessageActionDialog>,
        @Inject(MAT_DIALOG_DATA) public message: Message) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}