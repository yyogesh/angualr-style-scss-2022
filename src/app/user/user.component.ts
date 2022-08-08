import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { ActivatedRoute, Router } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError, delay, map, switchMap } from "rxjs/operators";
import { UsersService } from "./user.service";

@Component({
    selector: "app-user",
    template: `
    <h1>User Details</h1>
    <section *ngIf="user$ | async as user; else loading" class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </section>
    <ng-template #loading>
      <span>Loading...</span>
    </ng-template>
  `,
    styles: [
        `
      .user-card {
        background-color: #fafafa;
        border-radius: 5px;
        padding: 5px;
      }
    `,
    ],
})
export class UserComponent implements OnInit {
    user$!: Observable<User>;
    constructor(
        private users: UsersService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const userId = this.activatedRoute.snapshot.paramMap.get('userId');
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('params', params);
        });

        this.user$ = this.activatedRoute.data.pipe(
            map(data => data?.['user'])
        )

        console.log('userId', userId);
        // this.user$ = this.activatedRoute.params.pipe(
        //   map((param) => param?.['id']),
        //   delay(2000),
        //   switchMap((id) => this.users.getUser(id)),
        //   catchError(() => {
        //     this.router.navigate([""]);
        //     return EMPTY;
        //   })
        // );
    }
}
