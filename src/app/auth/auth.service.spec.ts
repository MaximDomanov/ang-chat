import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../domain/user';
import { of } from 'rxjs';
import { LocalstorageService } from '../common-services/localstorage.service';
import { LoginComponent } from './login/login.component';
import { NgZone } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let lsService: LocalstorageService;
  let ngZone: NgZone;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });

    RouterTestingModule.withRoutes([
      { path: 'login', component: LoginComponent }
    ])

    service = TestBed.get(AuthService);
    lsService = TestBed.get(LocalstorageService);
    ngZone = TestBed.get(NgZone);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('explicit should return user', (done: DoneFn) => {
    const valueServiceSpy =
      jasmine.createSpyObj('AuthService', ['explicit']);

    const stubValue = new User('Test', 'profileImage');

    valueServiceSpy.explicit.and.returnValue(of(stubValue));

    valueServiceSpy.explicit({ name: 'Test' }).subscribe(value => {
      expect(value).toBe(stubValue);
      done();
    })
  });

  it('explicit should return user with the same name', (done: DoneFn) => {
    let name = 'Test';
    service.explicit({ name }).subscribe(value => {
      expect(value.name).toBe(name);
      done();
    })
  });

  it('explicit should write user to localstorage users', (done: DoneFn) => {
    service.explicit({ name: 'Test' }).subscribe(value => {
      let users: User[] = lsService.getArrayFromJson<User>('users');

      expect(JSON.stringify(value)).toEqual(JSON.stringify(users[users.length - 1]));
      done();
    })
  });

  it('login should write to localstorage authorizedUser', (done: DoneFn) => {
    service.explicit({ name: 'Test' }).subscribe(explicitValue => {
      service.login(explicitValue.uuid).subscribe(loginValue => {
        let authUser = localStorage.getItem('authorizedUser');
        expect(JSON.stringify(explicitValue)).toEqual(authUser);
        done();
      });
    })
  });

  it('isAuthorized should be true if right user uuid', (done: DoneFn) => {
    service.explicit({ name: 'Test' }).subscribe(explicitValue => {
      service.login(explicitValue.uuid).subscribe(() => {
        let isAuthorized = service.isAuthorized();
        isAuthorized.subscribe(val => {
          expect(val).toEqual(true);
        });

        done();
      });
    })
  });

  it('isAuthorized should be false if wrong user uuid', (done: DoneFn) => {
    service.login('1').subscribe(() => {
      let isAuthorized = service.isAuthorized()
      isAuthorized.subscribe(val => {
        expect(val).toEqual(false);
      });

      done();
    })
  });

  it('isAuthorized should be false if logout called', (done: DoneFn) => {
    service.explicit({ name: 'Test' }).subscribe(explicitValue => {
      service.login(explicitValue.uuid).subscribe(() => {
        ngZone.run(() => {

          service.logout().subscribe(() => {
            let isAuthorized = service.isAuthorized();
            isAuthorized.subscribe(val => {
              expect(val).toEqual(false);
            });

            done();
          });
        });
      });
    });
  });
});
