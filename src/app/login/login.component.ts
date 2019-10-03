import { ServerService } from '../Service/server.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

class receivedUser {
  email: string;
  id: number;
  role: string;
  token: string;
  totalDaysOff: number;
  usedDays: number;
  remainingDays: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  error: Object;
  errorMessage: Boolean = false;
  user: Object;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

  ngOnInit() {
  }

  onClickSubmit() {
    if (!this.email.invalid && this.password.value !== undefined && this.password.value !== "") {
      this.serverService.login({
        email: this.email.value,
        password: this.password.value
      }).subscribe((data: receivedUser) => {
        localStorage.setItem("id", "" + data.id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("totalDaysOff", "" + data.totalDaysOff);
        localStorage.setItem("usedDays", "" + data.usedDays);
        localStorage.setItem("remainingDays", "" + data.remainingDays);
        this.router.navigate(['profile']);
      }, (error) => {
        this.error = { ...error };
        this.errorMessage = true;
        this.openSnackBar("Credentials are incorrect!", "Close")
      })
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
