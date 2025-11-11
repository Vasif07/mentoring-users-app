import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-folders-add-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrl: './folders-add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  title = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё\s]+$/)],
  });

  save() {
    if (this.title.valid) {
      this.dialogRef.close(this.title.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
