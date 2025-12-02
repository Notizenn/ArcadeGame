// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, NgIf],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.auth.login();
      this.error = '';
      this.router.navigate(['/']);
    } else {
      this.error = 'Identifiants invalides (admin / admin)';
    }
  }
}

