import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../Service/server.service';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  reason: string;
}

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.css']
})
export class ManageRequestComponent implements OnInit {
  requests: any[] = [];
  request: any;
  displayedColumns: string[] = ['nr', 'employee', 'date', 'accept', 'decline'];
  byId = {};
  reason: string;

  constructor(private serverService: ServerService, public dialog: MatDialog) { }

  openDialog(request): void {
    this.request = request;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { request: request, reason: this.reason }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reason = result;
      console.log(result);
      this.deny(result)
    });
  }

  ngOnInit() {
    this.serverService.getUsers().subscribe((data: any) => {
      data.forEach(element => {
        this.byId[element.id] = {
          email: element.email,
          usedDays: element.usedDays,
          totalDaysOff: element.totalDaysOff,
          remainingDays: element.remainingDays
        };
      });
    }, () => {
      alert("Sorry , there is an internal error!");
    })
    this.serverService.getRequests().subscribe((data: any) => {
      data.forEach((element, index) => {
        this.requests = this.requests.concat({
          ...element,
          position: index + 1
        })
      });
    }, () => {
      alert("Sorry , there is an internal error!");
    })
  }

  confirm(request) {
    const updatedReq = {
      "id": request.id,
      "approved": true,
      "done": true
    }
    this.serverService.manageRequest(updatedReq).subscribe((data) => {

      this.serverService.getRequests().subscribe((data: any) => {
        this.requests = [];
        data.forEach((element, index) => {
          this.requests = this.requests.concat({
            ...element,
            position: index + 1
          })
        });
      }, () => {
        alert("Sorry , there is an internal error!");
      })
    }, () => {
      alert("Sorry , there is an internal error!");
    })
  }

  deny(reason) {
    if (reason !== undefined) {
      const updatedReq = {
        "id": this.request.id,
        "approved": false,
        "done": true,
        "reason": reason
      }
      this.serverService.manageRequest(updatedReq).subscribe((data) => {
        const newUser = {
          "id": this.request.userid,
          "usedDays": this.byId[this.request.userid].usedDays - 1,
          "totalDaysOff": this.byId[this.request.userid].totalDaysOff,
          "remainingDays": this.byId[this.request.userid].remainingDays + 1,
        }
        this.serverService.updateUser(newUser).subscribe((data) => {}, () => {
          alert("Sorry , there is an internal error!");
        })

        this.serverService.getRequests().subscribe((data: any) => {
          this.requests = [];
          data.forEach((element, index) => {
            this.requests = this.requests.concat({
              ...element,
              position: index + 1
            })
          });
        }, () => {
          alert("Sorry , there is an internal error!");
        })
      }, () => {
        alert("Sorry , there is an internal error!");
      })
    }
  }
}
