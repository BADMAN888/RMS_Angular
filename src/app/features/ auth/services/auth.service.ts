import { Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'access_token'

  isLoggedIn = signal(!!localStorage.getItem(this.tokenKey))

  constructor(
    private readonly router: Router
  ) {
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
    this.isLoggedIn.set(true)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn()
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.isLoggedIn.set(false)
    this.router.navigate(['/login'])
  }

}
