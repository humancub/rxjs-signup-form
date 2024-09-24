import { Routes } from '@angular/router';
import { SignupFormComponent } from './components';

export const routes: Routes = [
  { path: 'signup-form', component: SignupFormComponent },
  { path: '', redirectTo: '/signup-form', pathMatch: 'full' },
];
