import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-materials-confirm-dialog',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './materials-confirm-dialog.component.html',
  styleUrl: './materials-confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsConfirmDialogComponent>);
  public data = inject(MAT_DIALOG_DATA) as { message: string };

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
