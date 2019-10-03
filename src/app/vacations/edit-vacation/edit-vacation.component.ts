import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: string;
}

@Component({
  selector: 'app-edit-vacation',
  templateUrl: './edit-vacation.component.html',
  styleUrls: ['./edit-vacation.component.css']
})
export class EditVacationComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<EditVacationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  dateFilter = (date: Date) =>
    ((date.getMonth() >= new Date().getMonth() && date.getDate() > new Date().getDate())
      || (date.getMonth() > new Date().getMonth())
    );

  onNoClick(): void {
    this.dialogRef.close();
  }
}
