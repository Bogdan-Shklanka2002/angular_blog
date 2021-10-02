import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard{

    constructor(
        public authService: AuthService,
        public router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean>{
        if(this.authService.isAuthenticated()){
            return true;
        }
        this.authService.logout();
        this.router.navigate(['/admin', 'login'], {
            queryParams: {
                loginAgain: true
            }
        });

        return false;
    }
}