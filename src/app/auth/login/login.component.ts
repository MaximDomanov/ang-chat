import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/chat']);
  }
}
