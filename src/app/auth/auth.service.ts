import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User, UserType } from "./user.model";

export type AuthResponseType = {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_KEY: string = 'AIzaSyAKV9bw6Uq7XBddZLpC7cvNTzPKNFbE7XY'
    private SIGNUP_API: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`
    private LOGIN_API: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`
    user = new BehaviorSubject<User | null>(null)
    tokenExpTimer: ReturnType<typeof setTimeout>;
    constructor(private http: HttpClient, private router: Router) { }

    private handleError(error: HttpErrorResponse) {
        const errorCode = error?.error?.error?.message as string ?? 'An unknown error occured';
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return throwError(() => new Error('Email already exists'))
            case 'INVALID_LOGIN_CREDENTIALS':
                return throwError(() => new Error('Invalid credentials'))
            default:
                return throwError(() => new Error(errorCode))
        }
    }

    private handleAuthenticationData(data: AuthResponseType) {
        const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
        const _user = new User(data.email, data.localId, data.idToken, expirationDate)
        this.user.next(_user)
        this.autoLogout(data.expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(_user))
    }

    autoLogin() {
        const userData = localStorage.getItem('userData')
        if (!userData) return
        const parsedData = JSON.parse(userData) as UserType;
        const loadedUser = new User(parsedData.email, parsedData.id, parsedData._token, new Date(parsedData._tokenExpirationDate))
        if (loadedUser.token) {
            const expDuration = new Date(parsedData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expDuration)
            this.user.next(loadedUser)
        } else
            this.logout()
    }

    autoLogout(expDuration: number) {
        this.tokenExpTimer = setTimeout(() => {
            this.logout()
        }, expDuration)
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseType>(this.SIGNUP_API, {
            email,
            password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(this.handleAuthenticationData.bind(this)))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseType>(this.LOGIN_API, {
            email,
            password,
            returnSecureToken: true
        })
            .pipe(catchError(this.handleError), tap(this.handleAuthenticationData.bind(this)))
    }

    logout() {
        this.user.next(null)
        localStorage.removeItem('userData');
        if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
        this.router.navigate(['/auth'])
    }

}