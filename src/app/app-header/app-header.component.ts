import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../common-services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
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
