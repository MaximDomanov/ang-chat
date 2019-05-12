import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../domain/user';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
    userService = TestBed.get(UserService);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('getUsers should be an array', () => {
    let user: User = new User('Test', 'Test');
    let users: User[] = [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    expect(Array.isArray(userService.getUsers())).toBe(true);
  });

  it('getUsers should be an array of users', () => {
    let user: User = new User('Test', 'Test');
    let users: User[] = [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    let firstUserOfArray: User = userService.getUsers()[0];
    expect(firstUserOfArray).toBeTruthy();
  });

  it('getAuthorizedUser should be equal to logged user', (done: DoneFn) => {
    authService.explicit({ name: 'Test' }).subscribe(explicitValue => {
      authService.login(explicitValue.uuid).subscribe(() => {
        let user: User = userService.getAuthorizedUser();

        expect(JSON.stringify(user)).toEqual(JSON.stringify(explicitValue));
        done();
      });
    });
  });
});
