import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/functions/password-validator.validator';
import { Auth } from '../../data-access/models/auth.model';
import { Subscription } from 'rxjs';

import { AlertComponent } from 'src/app/shared/ui/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/utils/directives/place-holder.directive';
import { Store } from '@ngrx/store';
import {
  clearError,
  signInStart,
  signUpStart,
} from '../../data-access/store/action/auth.actions';
import { selectAuthState } from '../../data-access/store/selector/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  submitted: boolean = false;
  error: string = '';
  isLoading: boolean = false;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost?: PlaceHolderDirective;
  private closeSubscription?: Subscription;
  private storeSubscription?: Subscription;

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, passwordValidator()])
    ),
  });

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.storeSubscription = this.store
      .select(selectAuthState)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((authState) => {
        this.isLoading = authState.loading;

        if (authState.authError) {
          this.error = authState.authError;
          this.showErrorAlert(this.error);
        }
      });
  }

  constructor(private store: Store) {}

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

      if (this.isLoginMode) {
        this.store.dispatch(signInStart({ userDetails }));
      } else {
        this.store.dispatch(signUpStart({ userDetails }));
      }

      this.resetForm();
    }
  }

  onHandleError() {
    this.store.dispatch(clearError());
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
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
