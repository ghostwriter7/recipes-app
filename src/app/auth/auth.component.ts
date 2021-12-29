import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public isSignUpForm = false;
  public error: string | null = null;
  public isLoading = false;

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    if (this.isSignUpForm) {
      authObservable = this.authService.signUp(form.value['email'], form.value['password']);
    } else {
      authObservable = this.authService.logIn(form.value['email'], form.value['password']);
    }

    authObservable.subscribe({
        next: (data) => {
          this.isLoading = false;
          form.reset();
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
        }
      });
  }

}
