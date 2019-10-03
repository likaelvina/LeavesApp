import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  isManager: Boolean;
  isHR: Boolean;
  currentLink: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("role") === "manager" || localStorage.getItem("role") === "human resource") {
      this.isManager = true;
    }
    if (localStorage.getItem("role") === "human resource") {
      this.isHR = true;
    }
    this.currentLink = this.router.url.substr(1);
  }

  setClass(link) {
    this.currentLink = link;
  }

}
