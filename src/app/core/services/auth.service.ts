import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse, LoginDto, RegisterDto } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7012/api/auth';

  currentUser = signal<AuthResponse | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    const role = localStorage.getItem('role');
    if (token && fullName && role) {
      this.currentUser.set({ token, fullName, role });
    }
  }

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto);
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto);
  }

  saveUser(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('fullName', response.fullName);
    localStorage.setItem('role', response.role);
    this.currentUser.set(response);
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') ?? '';
  }
}