import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../Service/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  totalUsers: any[] = []
  users: any[] = [];
  displayedColumns: string[] = ['nr', 'employee', 'role', 'delete'];
  filterValue: string = "";
  email: string;
  password: string;
  role: string;
  totalDaysOff: string;

  constructor(private serverService: ServerService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.serverService.getUsers().subscribe((data: any) => {
      data.forEach((element, index) => {
        this.users = this.users.concat({
          ...element,
          position: index + 1
        })
      })
      this.totalUsers = [...this.users]
    }, () => {
      alert("Sorry , there is an internal error!");
    })
  }

  applyFilter(value) {
    this.filterValue = value;
    this.users = this.totalUsers.filter(el => el.email.includes(value))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: {
        email: this.email,
        password: this.password,
        role: this.password,
        totalDaysOff: this.password,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (
          result.email !== undefined
          && result.password !== undefined
          && result.role !== undefined
          && result.totalDaysOff !== undefined) {
          const newUser = {
            ...result,
            "usedDays": 0,
            "remainingDays": result.totalDaysOff
          }
          this.serverService.addUser(newUser).subscribe((data) => {
            this.serverService.getUsers().subscribe((data: any) => {
              this.users = []
              data.forEach((element, index) => {
                this.users = this.users.concat({
                  ...element,
                  position: index + 1
                })
              })
              this.totalUsers = [...this.users];
            }, () => {
              alert("Sorry , there is an internal error!");
            })
          }, () => {
            alert("Sorry , there is an internal error!");
          })
        } else {
          this.openSnackBar()
        }
      }
    });
  }

  openSnackBar() {
    this.snackBar.open("User not added. Please fill all the fields.", "Close", {
      duration: 10000,
    });
  }

  deleteUser(id) {
    this.serverService.deleteUser(id).subscribe((data) => {

      this.serverService.getUserVacations(id).subscribe((data: any) => {
        data.forEach(element => {
          this.serverService.deleteVacation(element.id).subscribe((data) => {
            console.log(data)
          }, error => console.log(error))
        })
      }, () => {
        alert("Sorry , there is an internal error!");
      })

      this.serverService.getUsers().subscribe((data: any) => {
        this.totalUsers = []

        data.forEach((element, index) => {
          this.totalUsers = this.totalUsers.concat({
            ...element,
            position: index + 1
          })
        })
        this.users = this.totalUsers.filter(el => el.email.includes(this.filterValue))
      }, () => {
        alert("Sorry , there is an internal error!");
      })
    }, () => {
      alert("Sorry , there is an internal error!");
    })
  }

}
