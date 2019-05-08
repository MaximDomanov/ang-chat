import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { Observable, of, throwError, Subscriber, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserService } from '../common-services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: String;
  isAuthorizedSubject = new BehaviorSubject<boolean>(this.checkAuthorizedUser());

  constructor(private userService: UserService) { }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  checkAuthorizedUser(): boolean {
    const user = localStorage.getItem('authorizedUser');
    return user ? true : false;
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
        this.isAuthorizedSubject.next(false);
      })
    );
  }

  explicit({ name }): Observable<User> {
    let user: User = new User(name);
    let users: User[] = this.userService.getUsers();

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return of(user).pipe(delay(1000));
  }
}
