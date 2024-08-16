import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmatioon-dialog.component.html',
  styleUrls: ['./confirmatioon-dialog.component.css']
})
export class ConfirmatioonDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmatioonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true); // Return true on confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false on cancellation
  }
}
