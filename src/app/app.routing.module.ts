import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';

const routes: Routes = [
  { path: "", component: UserListComponent, title: 'User-List' },
  { path: "user/:id/:userId", component: UserComponent, resolve: { user: UserResolver }, title: 'User-Detail' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
