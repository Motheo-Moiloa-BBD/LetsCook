import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/functions/password-validator.validator';
import { AuthService } from '../../data-access/services/auth.service';
import { Auth } from '../../data-access/models/auth.model';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../data-access/models/auth-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  submitted: boolean = false;
  error: string = '';
  isLoading: boolean = false;

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
        next: (response) => {
          console.log(response);
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.error = error.message;
          this.isLoading = false;
        },
      });

      this.resetForm();
    }
  }

  resetForm() {
    this.authForm.reset();
    this.submitted = false;
  }
}
