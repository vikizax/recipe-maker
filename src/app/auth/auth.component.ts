import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (!this.isLoginMode)
      this.authService.signup(email, password).subscribe({
        next: resData => {
          console.log({ resData })
          this.loading = false;
          form.resetForm()
        }, error: error => {
          console.log(error)
          this.loading = false;
        }
      })
  }

}
