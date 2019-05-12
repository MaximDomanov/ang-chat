import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';
import { User } from '../domain/user';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(LocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getArrayFromJson should be an array', () => {
    let user: User = new User('Test', 'Test');
    let users: User[] = [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    expect(Array.isArray(service.getArrayFromJson<User>('users'))).toBe(true);
  });
});
