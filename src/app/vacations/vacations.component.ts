import { Component, OnInit } from '@angular/core';
import { ServerService } from '../Service/server.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { EditVacationComponent } from './edit-vacation/edit-vacation.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {
  vacations: any[] = [];
  displayedColumns: string[] = ['position', 'date', 'feedback', 'edit', 'cancel'];
  datePicker: string;
  finishedDays = false;
  notValidDate = true;
  vacation: any;

  constructor(private serverService: ServerService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

  dateFilter = (date: Date) =>
    ((date.getMonth() >= new Date().getMonth() && date.getDate() > new Date().getDate())
      || (date.getMonth() > new Date().getMonth())
    );

  ngOnInit() {
    const id = localStorage.getItem("id")
    this.serverService.getUserVacations(id).subscribe((data: any) => {
      data.forEach((element, index) => {
        this.vacations = this.vacations.concat({
          ...element,
          position: index + 1
        })
      });
      const remainingDays = parseInt(localStorage.getItem("remainingDays"));
      if (remainingDays === 0) {
        this.finishedDays = true
      }
    }, (error) => {
      console.log(error)
    })
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.datePicker = event.target.value.toLocaleDateString()
  }

  openDialog(vacation): void {
    this.vacation = vacation;
    const dialogRef = this.dialog.open(EditVacationComponent, {
      width: '250px',
      data: {
        date: vacation.date,
        vacation: vacation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.date) {
          const updatedRequest = {
            id: result.vacation.id,
            date: result.date.toLocaleDateString(),
            approved: false,
            done: false
          }
          this.serverService.manageRequest(updatedRequest).subscribe((data: any) => {

            this.serverService.getUserVacations(result.vacation.userid).subscribe((data: any) => {
              this.vacations = [];
              data.forEach((element, index) => {
                this.vacations = this.vacations.concat({
                  ...element,
                  position: index + 1
                })
              });
            }, () => {
              alert("Sorry there is an internal error!")
            })

          })
        }
      }
    });
  }

  cancel = (event, vacation) => {
    const userid = parseInt(localStorage.getItem("id"))
    const newUser = {
      "id": userid,
      "usedDays": parseInt(localStorage.getItem("usedDays")) - 1,
      "remainingDays": parseInt(localStorage.getItem("remainingDays")) + 1
    }

    this.serverService.deleteVacation(vacation.id).subscribe((data) => {

      this.serverService.updateUser(newUser).subscribe((data: any) => {
        console.log(data);
        localStorage.setItem("usedDays", "" + data.usedDays);
        localStorage.setItem("remainingDays", "" + data.remainingDays);
        if (data.remainingDays === 0) {
          this.finishedDays = true
        } else {
          this.finishedDays = false
        }
      }, () => {
        alert("Sorry there is an internal error!")
      })
      this.vacations = []
      this.serverService.getUserVacations(userid).subscribe((data: any) => {
        data.forEach((element, index) => {
          this.vacations = this.vacations.concat({
            ...element,
            position: index + 1
          })
        });
      }, () => {
        alert("Sorry there is an internal error!")
      })
    })
  }

  addVacationDay = () => {
    if (this.datePicker === undefined) {
      this.openSnackBar("Choose a valid date!", "Close")
      return;
    }
    const newDay = {
      "userid": parseInt(localStorage.getItem("id")),
      "date": this.datePicker,
      "approved": false,
      "reason": null,
      "done": false
    }
    const newUser = {
      "id": parseInt(localStorage.getItem("id")),
      "usedDays": parseInt(localStorage.getItem("usedDays")) + 1,
      "remainingDays": parseInt(localStorage.getItem("remainingDays")) - 1
    }

    this.serverService.setUserVacation(newDay).subscribe((data: any) => {
      this.serverService.getUserVacations(parseInt(localStorage.getItem("id"))).subscribe((data: any) => {
        this.vacations = [];
        data.forEach((element, index) => {
          this.vacations = this.vacations.concat({
            ...element,
            position: index + 1
          })
        });
      }, () => {
        alert("Sorry there is an internal error!")
      })
      this.serverService.updateUser(newUser).subscribe((data: any) => {
        localStorage.setItem("usedDays", "" + data.usedDays);
        localStorage.setItem("remainingDays", "" + data.remainingDays);
        if (data.remainingDays === 0) {
          this.finishedDays = true;
        }
      }, () => {
        alert("Sorry there is an internal error!")
      })
    }, () => {
      alert("Sorry there is an internal error!")
    })
  }

}
