import { Injectable } from '@angular/core';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAuthorizedUser(): User {
    let authorizedUser: User;

    try {
      authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    } catch (e) {
      authorizedUser = null;
    }

    return authorizedUser;
  }

  getUsers(): User[] {
    let users: User[];

    try {
      users = JSON.parse(localStorage.getItem('users'));
    } catch (e) {
      users = [];
    }

    if (!Array.isArray(users)) {
      users = [];
    }

    return users;
  }
}
