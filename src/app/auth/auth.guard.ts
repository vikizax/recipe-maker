import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user.pipe(
        take(1),
        map(user => {
            const isAuth = !!user;
            if (isAuth) return true;
            return router.createUrlTree(['/auth'])
        })
    )
}