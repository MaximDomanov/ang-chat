import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  date = Date.now();
  chatInput: String = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
