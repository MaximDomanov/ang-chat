import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneSnackBarComponent } from './chat-phone-snack/chat-phone-snack.component';
import { ShareSnackBarComponent } from './chat-share-snack/chat-share-snack.component';

@NgModule({
  declarations: [
    ChatComponent,
    PhoneSnackBarComponent,
    ShareSnackBarComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    PhoneSnackBarComponent,
    ShareSnackBarComponent
  ]
})
export class ChatModule { }
