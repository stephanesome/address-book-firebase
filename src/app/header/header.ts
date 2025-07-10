import {Component, inject} from '@angular/core';
import { AsyncPipe } from "@angular/common";
import {User} from "@angular/fire/auth";
import {AuthService} from "../authentication/auth-service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe
],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  get user(): Observable<User | null> {
    return this.authService.user$;
  }

  signOut(): void {
    this.authService.signOut().then((_) => {
      this.router.navigate(['sign-in']).then(() => {});
    });
  }
}
