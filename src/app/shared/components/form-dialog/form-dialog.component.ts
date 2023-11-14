import { DialogConfig } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IFormGenerator } from '../form-generator/form-generator-interface';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public form: IFormGenerator[]) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  formSubmitted(args: IFormGenerator[]) {
    this.dialogRef.close(args)
  }
}
