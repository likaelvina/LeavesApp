import { ManageRequestComponent } from './manage-request/manage-request.component';
import { VacationsComponent } from './vacations/vacations.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuard } from './guards/manager.guard';
import { UserGuard } from './guards/user.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      { path: "", component: ProfileComponent },
      { path: "profile", component: ProfileComponent },
      { path: "vacations", component: VacationsComponent },
      { path: "manageRequests", component: ManageRequestComponent, canActivate: [ManagerGuard] },
      { path: "users", component: ManageUsersComponent, canActivate: [AdminGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
