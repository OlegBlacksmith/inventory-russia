import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  firstValueFrom,
} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  async login(username: string, password: string): Promise<void> {
    const res: any = await firstValueFrom(
      this.http.post(`${environment.baseApiUrl}/auth/login`, { username, password })
    );
    localStorage.setItem(this.tokenKey, res.accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserName(): string {
    const token = this.getToken();
    if (!token) return 'anonymous';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }
}
