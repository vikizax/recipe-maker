import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseType, AuthService } from './auth.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  loading: boolean = false;
  error: string | null = null;
  userSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    // this.userSubs = authService.user.subscribe(user => console.log({ user: user.token }))
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.error = null;
    const email = form.value.email;
    const password = form.value.password;
    this.loading = true;

    let authObservable: Observable<AuthResponseType>;

    if (!this.isLoginMode)
      authObservable = this.authService.signup(email, password)
    else
      authObservable = this.authService.login(email, password)

    authObservable.subscribe({
      next: () => {
        this.loading = false;
        form.resetForm()
        this.router.navigate(['/recipies'])
      }, error: (error: Error) => {
        this.error = error.message as string
        this.loading = false;
      }
    })

  }

}
