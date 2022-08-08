import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, delay, EMPTY, Observable, of } from 'rxjs';
import { User } from './user';
import { UsersService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
    constructor(private users: UsersService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.users.getUser(route.params?.['id']).pipe(
            delay(4000),
            catchError(() => {
                this.router.navigate([""]);
                return EMPTY;
            })
        )
    }
}
