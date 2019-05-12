import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent, PhoneSnackBarComponent, ShareSnackBarComponent } from './chat/chat.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
