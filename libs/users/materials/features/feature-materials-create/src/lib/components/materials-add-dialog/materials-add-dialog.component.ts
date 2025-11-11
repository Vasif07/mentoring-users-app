import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Material } from '@users/materials/data-access';

@Component({
  standalone: true,
  selector: 'app-materials-add-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(MAT_DIALOG_DATA) as { folderId: number; materials: Material[] };
  errorMessage: string | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    material_link: ['', [Validators.required, this.linkTypeValidator.bind(this)]],
    type: ['', Validators.required],
  });

  constructor() {
    this.form.get('type')!.valueChanges.subscribe(() => {
      this.form.get('material_link')?.updateValueAndValidity();
    });
  }

  linkTypeValidator(control: AbstractControl): ValidationErrors | null {
    const type = this.form?.get('type')?.value;
    const link = control.value?.toLowerCase();

    if (!link) return null;

    if (type === 'video' && !/(youtube\.com|youtu\.be)/.test(link)) return { typeMismatch: true };
    if (type === 'pdf' && !link.endsWith('.pdf')) return { typeMismatch: true };
    if (type === 'audio' && !link.endsWith('.mp3')) return { typeMismatch: true };

    return null;
  }

  save() {
    if (!this.form.valid) return;

    const newLink = this.form.get('material_link')!.value?.toLowerCase();

    const exists = this.data.materials.some((m) => m.material_link?.toLowerCase() === newLink);

    if (exists) {
      this.errorMessage = 'Материал с такой ссылкой уже существует';
      return;
    }

    this.dialogRef.close({
      ...this.form.value,
      folder_id: this.data.folderId,
      created_at: new Date().toISOString(),
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
