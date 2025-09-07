import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    this.errorMessage = '';
    this.isLoading = true;

    try {
      await this.authService.login(this.username, this.password);
      this.router.navigate(['/admin']);
    } catch (err) {
      console.error('Ошибка входа', err);
      this.errorMessage = 'Неверный логин или пароль';
    } finally {
      this.isLoading = false;
    }
  }
}
