import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-folders-confirm-dialog',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-confirm-dialog.component.html',
  styleUrl: './folders-confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<FoldersConfirmDialogComponent>);
  public data = inject(MAT_DIALOG_DATA) as { message: string };

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
