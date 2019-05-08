import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localstorageService: LocalstorageService) { }

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
    let users: User[] = this.localstorageService.getArrayFromJson<User>('users');
    return users;
  }
}
