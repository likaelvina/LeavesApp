import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string;
  role: string;
  id: number;

  isUser: Boolean;
  isManager: Boolean;
  isHumanResource: Boolean;

  constructor(private router: Router) { }

  checkUser = () => {
    this.email = localStorage.getItem("email");
    this.role = localStorage.getItem("role");
    this.id = parseInt(localStorage.getItem("id"));
    if (this.role === "human resouce") {
      this.isHumanResource = true;
      this.isManager = true;
      this.isUser = true;
    } else if (this.role === "manager") {
      this.isManager = true;
      this.isUser = true;
    } else if (this.role === "user") {
      this.isUser = true;
    }
  }

  ngOnInit() {
    this.checkUser();
  }

  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("totalDaysOff");
    localStorage.removeItem("usedDays");
    localStorage.removeItem("remainingDays");
    this.router.navigate(['login']);
  }
}
