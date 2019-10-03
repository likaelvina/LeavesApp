import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatSelectModule,
  MatSnackBarModule,
  MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomFormsModule } from 'ngx-custom-validators';


@NgModule({
  imports: [
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    CustomFormsModule,
    FormsModule
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    CustomFormsModule,
    FormsModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class MaterialModule { }