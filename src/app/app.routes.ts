import { Routes } from '@angular/router';
import {SignIn} from "./sign-in/sign-in";
import {SignUp} from "./sign-up/sign-up";
import {AddressList} from "./address-list/address-list";
import {AuthGuard} from "@angular/fire/auth-guard";
import {PasswordForgot} from "./password-forgot/password-forgot";

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'address-list', component: AddressList, canActivate: [AuthGuard] },
  { path: 'password-forgot', component: PasswordForgot }
];
