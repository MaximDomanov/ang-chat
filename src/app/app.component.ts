import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './common-services/user.service';
import { User } from './domain/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ang-chat';
  authorizedUser: User;
  isAuthorized: Observable<boolean>;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();
    this.isAuthorized.subscribe(() => {
      this.authorizedUser = this.userService.getAuthorizedUser();
    });
  }

  logout() {
    this.isLoading = true;
    this.authService.logout()
      .subscribe(
        () => {
          this.isLoading = false;
          this.authorizedUser = this.userService.getAuthorizedUser();
        },
        (err) => {
          this.isLoading = false;
        });
  }
}
