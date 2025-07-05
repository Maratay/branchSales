import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.css',
})
export class DeleteConfirmDialogComponent {
  readonly dialog = inject(MatDialog);
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); 
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
