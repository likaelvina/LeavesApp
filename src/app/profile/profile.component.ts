import { Component, OnInit } from '@angular/core';
import { ServerService } from '../Service/server.service';

class User {
  email: String;
  name: String;
  lastname: String;
  totalDaysOff: number;
  usedDays: number;
  remainingDays: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  email: String;
  name: String;
  lastname: String;
  totalDaysOff: number;
  usedDays: number;
  remainingDays: number;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    const id = localStorage.getItem("id")
    this.serverService.getUser(id).subscribe((data: User) => {
      this.email = data.email;
      this.totalDaysOff = data.totalDaysOff;
      this.usedDays = data.usedDays;
      this.remainingDays = data.remainingDays;
      localStorage.setItem("usedDays", "" + data.usedDays);
      localStorage.setItem("remainingDays", "" + data.remainingDays);
    }, (error) => {
      console.log(error);
    })
  }
}
