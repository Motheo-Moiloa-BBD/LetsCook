import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/functions/password-validator.validator';
import { AuthService } from '../../data-access/services/auth.service';
import { Auth } from '../../data-access/models/auth.model';
import { Observable, Subscription } from 'rxjs';
import { AuthResponse } from '../../data-access/models/auth-response.model';
import { AlertComponent } from 'src/app/shared/ui/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/utils/directives/place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  submitted: boolean = false;
  error: string = '';
  isLoading: boolean = false;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost?: PlaceHolderDirective;
  private closeSubscription?: Subscription;

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, passwordValidator()])
    ),
  });

  constructor(private authService: AuthService) {}

  get formControls() {
    return this.authForm.controls;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.submitted = true;
    if (this.authForm.valid) {
      const userDetails: Auth = {
        email: this.formControls.email.value!,
        password: this.formControls.password.value!,
      };

      let auth$: Observable<AuthResponse>;

      this.isLoading = true;

      if (this.isLoginMode) {
        auth$ = this.authService.signIn(userDetails);
      } else {
        auth$ = this.authService.signUp(userDetails);
      }

      auth$.subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.error = error.message;
          this.showErrorAlert(error.message);
          this.isLoading = false;
        },
      });

      this.resetForm();
    }
  }

  onHandleError() {
    this.error = '';
  }

  private showErrorAlert(message: string) {
    if (this.alertHost) {
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const componentRef =
        hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

      componentRef.instance.message = message;
      this.closeSubscription = componentRef.instance.close.subscribe(() => {
        if (this.closeSubscription) {
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        }
      });
    }
  }

  resetForm() {
    this.authForm.reset();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
