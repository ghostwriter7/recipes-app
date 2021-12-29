import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private readonly signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEJeS0s7V-_Ard_EXTVEMI18cF4aENIws';
  private readonly signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEJeS0s7V-_Ard_EXTVEMI18cF4aENIws'

  constructor(
    private readonly authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === this.signInURL || req.url === this.signUpURL) {
      return next.handle(req);
    }
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        const newReq = req.clone({ params: req.params.append('auth', user!._token)});

        return next.handle(newReq);
      })
    );
  }
}
