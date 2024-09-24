import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { emailValidator, matchPasswordsValidator } from '../../shared';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  isFormValid$ = new BehaviorSubject<boolean>(false);
  showError$ = new BehaviorSubject<string | null>(null);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator()]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchPasswordsValidator() }
    );

    this.signupForm.valueChanges.subscribe(() => {
      this.isFormValid$.next(this.signupForm.valid && this.signupForm.touched);
    });
  }

  onSignup() {
    if (!this.signupForm.valid) {
      this.showError$.next('Please fill all required fields correctly.');
      return;
    }

    const formData = this.signupForm.value;
    console.log('Signing up with:', formData);

    // example of submission process
    // this.authService.signup(formData).subscribe(response => { ... });

    this.signupForm.reset();
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
    this.showError$.next(null);
  }

  onReset() {
    this.signupForm.reset();
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
    this.showError$.next(null);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
