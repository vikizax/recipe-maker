import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export type AuthResponseType = {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
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
    user = new Subject<User>()

    constructor(private http: HttpClient) { }

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

}