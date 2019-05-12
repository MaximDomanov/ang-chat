import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/common-services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  choosedUser: User = null;
  loginForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  isLoading: Boolean = false;
  isAuthorized: Observable<boolean>;
  authorizedUser: User;
  userList: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.authorizedUser = this.userService.getAuthorizedUser();
    this.isAuthorized = this.authService.isAuthorized();
    this.userList = this.userService.getUsers();
  }

  onSubmit() {
    this.isLoading = true;
    let name: String = this.loginForm.controls['name'].value;
    this.explicit({ name });
  }

  explicit({ name }) {
    this.authService.explicit({ name })
      .subscribe(
        (user: User) => {
          this.login(user)
        });
  }

  login(user: any) {
    if (!user) {
      return;
    }

    this.isLoading = true;
    this.authService.login(user.uuid)
      .subscribe(
        (success: Boolean) => {
          if (success) {
            this.router.navigate(['/chat']);
            return;
          }

          this.isLoading = false;
        },
        () => this.isLoading = false
      )
  }

  logout() {
    this.isLoading = true;
    this.authService.logout()
      .subscribe(
        () => {
          this.authorizedUser = this.userService.getAuthorizedUser();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        });
  }
}
