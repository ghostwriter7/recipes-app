import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public isSignUpForm = false;
  public error: string | null = null;
  public isLoading = false;
  private componentSubscription!: Subscription;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
              ) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;

    if (this.isSignUpForm) {
      authObservable = this.authService.signUp(form.value['email'], form.value['password']);
    } else {
      authObservable = this.authService.logIn(form.value['email'], form.value['password']);
    }

    authObservable.subscribe({
        next: () => {
          this.isLoading = false;
          form.reset();
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
          this.showErrorAlert(err);
        }
      });
  }

  private showErrorAlert(error: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent<AlertComponent>(alertCmpFactory);

    componentRef.instance.message = error;
    this.componentSubscription = componentRef.instance.close.subscribe(() => {
      this.componentSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

}
