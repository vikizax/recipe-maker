import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseType, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  loading: boolean = false;
  error: string | null = null;
  userSubs: Subscription;
  private onCloseSubscription: Subscription;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  constructor(private authService: AuthService, private router: Router) { }

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
        this.router.navigate(['/recipies'])
        form.resetForm()
        this.loading = false;
      }, error: (error: Error) => {
        this.error = error.message as string
        this.showErrorAlert(error.message)
        this.loading = false;
      }
    })

  }

  onErrorClose() {
    this.error = ''
    this.onCloseSubscription.unsubscribe()
    const hostContRef = this.alertHost.viewContainerRef
    hostContRef.clear();
  }

  private showErrorAlert(message: string) {
    const hostContRef = this.alertHost.viewContainerRef
    hostContRef.clear();
    const componentRef = hostContRef.createComponent(AlertComponent)
    componentRef.instance.error = message
    this.onCloseSubscription = componentRef.instance.close.subscribe(() => this.onErrorClose())
  }

  ngOnDestroy(): void {
    if(this.onCloseSubscription)
      this.onCloseSubscription.unsubscribe()
  }


}
