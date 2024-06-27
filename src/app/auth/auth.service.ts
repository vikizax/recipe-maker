import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

type AuthResponseType =  {
    kind: string;
    idToken:string;
    email:string;
    refreshToken: string;
    expiresIn:string;
    localId:string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_KEY: string = 'AIzaSyAKV9bw6Uq7XBddZLpC7cvNTzPKNFbE7XY'
    private API: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`
    constructor(private http: HttpClient) { }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseType>(this.API, {
            email,
            password,
            returnSecureToken: true
        })
    }

    login(email:string, password: string) {
        
    }

}