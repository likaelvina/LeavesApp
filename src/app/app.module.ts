import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ServerService } from "./Service/server.service";
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { VacationsComponent } from './vacations/vacations.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';
import { DeleteDialogComponent } from './manage-request/delete-dialog/delete-dialog.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserDialogComponent } from './manage-users/add-user-dialog/add-user-dialog.component';
import { EditVacationComponent } from './vacations/edit-vacation/edit-vacation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    HomeComponent,
    SideNavigationComponent,
    VacationsComponent,
    ManageRequestComponent,
    DeleteDialogComponent,
    ManageUsersComponent,
    AddUserDialogComponent,
    EditVacationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
  exports: [
    DeleteDialogComponent,
    AddUserDialogComponent,
    EditVacationComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    AddUserDialogComponent,
    EditVacationComponent
  ]
})
export class AppModule { }
