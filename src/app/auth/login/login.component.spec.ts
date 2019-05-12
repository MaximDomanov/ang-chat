import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LocalstorageService } from 'src/app/common-services/localstorage.service';
import { User } from 'src/app/domain/user';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZone } from '@angular/core';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let lsService: LocalstorageService;
  let authService: AuthService;
  let ngZone: NgZone;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    lsService = TestBed.get(LocalstorageService);
    authService = TestBed.get(AuthService);
    fixture.detectChanges();

    RouterTestingModule.withRoutes([
      { path: 'login', component: LoginComponent }
    ])

    ngZone = TestBed.get(NgZone);
  });

  it('explicit should write new user to localstorage users', (done: DoneFn) => {
    let usersOld: User[] = lsService.getArrayFromJson<User>('users');
    ngZone.run(() => {
      component.explicit({ name: 'Test' })
    });

    let usersNew: User[] = lsService.getArrayFromJson<User>('users');

    expect(usersNew.length).toBeGreaterThan(usersOld.length);
    done();
  });

  it('login start should change flag isLoading to true', (done: DoneFn) => {
    ngZone.run(() => {
      component.login({ name: 'Test' })
    });

    expect(component.isLoading).toEqual(true);
    done();
  });

  it('login success should change flag isLoading to false', (done: DoneFn) => {
    ngZone.run(() => {
      authService.explicit({ name }).subscribe(value => {
        component.login(value)
        done();
      });
    });

    expect(component.isLoading).toEqual(false);
    done();
  });
});
