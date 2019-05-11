import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { Observable, of, throwError, Subscriber, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserService } from '../common-services/user.service';
import { ICONS } from './auth-icon-list';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: String;
  isAuthorizedSubject = new BehaviorSubject<boolean>(this.checkAuthorizedUser());

  constructor(
    private userService: UserService,
    private router: Router) { }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  login(uuid: String): Observable<Boolean> {
    let success: boolean = false;
    let users: User[];
    let currentUser: User;
    users = this.userService.getUsers();
    currentUser = users.find((user: User) => user.uuid === uuid)
    if (currentUser) {
      success = true;
      localStorage.setItem('authorizedUser', JSON.stringify(currentUser));
    } else {
      success = false;
    }

    return of(success).pipe(
      delay(1000),
      tap(() => {
        this.isAuthorizedSubject.next(success);
      })
    );
  }

  logout() {
    localStorage.removeItem('authorizedUser');

    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.router.navigateByUrl('/login');
        this.isAuthorizedSubject.next(false);
      })
    );
  }

  explicit({ name }): Observable<User> {
    let profileImage = this.getRandomAuthProfileImage();
    let user: User = new User(name, profileImage);
    let users: User[] = this.userService.getUsers();

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return of(user).pipe(delay(1000));
  }

  private getRandomAuthProfileImage(): string {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
  }

  private checkAuthorizedUser(): boolean {
    const user = localStorage.getItem('authorizedUser');
    return user ? true : false;
  }
}
