import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "../admin/shared/services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        if(this.authService.isAuthenticated()){
            request = request.clone({
                setParams: {
                    auth: this.authService.token
                }
            })
        }
        return next.handle(request).pipe(
            tap(() => {console.log('Interceptor')}),
            catchError((error: HttpErrorResponse) => {
                console.log("Interceptor - ", error);
                if(error.status == 401){
                    this.authService.logout();
                    this.router.navigate(['/admin', 'login'], {
                        queryParams: {
                            authFiled: true
                        }
                    })
                }
                return throwError(error);
            })
        );
    }
}

