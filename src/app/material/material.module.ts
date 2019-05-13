import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule],
})
export class MaterialModule { }
