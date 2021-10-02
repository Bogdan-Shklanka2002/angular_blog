import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FBAuthResponse, User} from "../../../shared/interfaces"
import { environment } from "src/environments/environment";
import { tap, map, catchError } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor (private http : HttpClient) {}

    get token(): string {
        const expiresDate = new Date(localStorage.getItem('fb-token-exp'));
        if (new Date() > expiresDate) {
            this.logout();
            return null;
        } else {
            return localStorage.getItem('fb-token');
        }
    }

    login(user : User) {
        
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.ApiKey}`, user)
            .pipe(tap((response: any) =>this.setToken(response)),
            catchError((error: any) => {
                const { message } = error.error.error;
                switch (message) {
                    case 'INVALID_EMAIL':
                        this.error$.next('invalid email');
                    break;
                    case 'INVALID_PASSWORD':
                        this.error$.next('invalid password');
                    break;
                    case 'EMAIL_NOT_FOUND':
                        this.error$.next('email not found');
                    break;
                }
                return throwError(error);
            }))
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated() : boolean {
        return !!this.token;
    }

    private setToken(response: FBAuthResponse) {
        console.log(response);
        if (response) {
            const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expiresDate.toString());
        } else {
            localStorage.clear();
        }
    }
}