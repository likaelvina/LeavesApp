import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
  role: string;
  totalDaysOff: number;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
