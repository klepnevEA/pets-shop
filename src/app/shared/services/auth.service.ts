import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthResponse, IAdmin } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public isAuth!: boolean;

  private setToken(response: IAuthResponse | any): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('firebase-token', response.idToken);
      localStorage.setItem('firebase-token-exp', expDate.toString());
      localStorage.setItem('isAuth', 'true');
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = new Date(JSON.parse(localStorage.getItem('firebase-token-exp') || '{}'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/admin', 'login']);
    this.isAuth = !!localStorage.getItem('isAuth');
  }

  private showError(err: HttpErrorResponse): void {
    console.log(err);
  }

  public login(user: IAdmin): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user,
      )
      .pipe(
        tap(this.setToken),
        catchError(async (err) => this.showError(err)),
        tap(() => {
          this.isAuth = !!localStorage.getItem('isAuth');
        }),
      );
  }
}
