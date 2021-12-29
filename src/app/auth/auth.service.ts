import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEJeS0s7V-_Ard_EXTVEMI18cF4aENIws';
  private readonly signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEJeS0s7V-_Ard_EXTVEMI18cF4aENIws'
  private tokenExpirationTimer: any;
  public user = new BehaviorSubject<User | null>(null);
  public timer = new Subject<number>();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpURL, { email, password, returnSecureToken: true } )
      .pipe(catchError(this.handleError), tap(this.handleUser.bind(this)));
  }

 public logIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signInURL, { email, password, returnSecureToken: true })
    .pipe(catchError(this.handleError), tap(this.handleUser.bind(this)));
}

public logOut() {
    localStorage.removeItem('user');
  this.user.next(null);
  this.router.navigate(['/auth']);
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Something went wrong! Sorry!';
    console.log(err);
    if (err.hasOwnProperty('error') && err.error.hasOwnProperty('error')) {

      switch(err.error.error.message) {
        case 'EMAIL_EXISTS': {
          errorMessage = 'This email already exists!'
          break;
        }
        case 'INVALID_PASSWORD': {
          errorMessage = 'This password is invalid!';
          break;
        }
        case 'EMAIL_NOT_FOUND': {
          errorMessage = 'User with this e-mail does not exist!';
          break;
        }
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user: User = {
      email: data.email,
      id: data.localId,
      _token: data.idToken,
      _tokenExpirationDate: expirationDate
    };

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.setTimerForLogout(expirationDate);
  }

  private setTimerForLogout(expirationDate: Date) {
    const timeLeft = expirationDate.getTime() - new Date().getTime();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, timeLeft);
  }

  public autoLogin() {
    if (localStorage.getItem('user')) {
      const user: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string
      } = JSON.parse((<string>localStorage.getItem('user')));

      if (new Date().getTime() < new Date(user._tokenExpirationDate).getTime()) {
        this.user.next({
          email: user.email,
          id: user.id,
          _token: user._token,
          _tokenExpirationDate: new Date(user._tokenExpirationDate)
        });
        this.setTimerForLogout(new Date(user._tokenExpirationDate));
      }
    }
  }
}
