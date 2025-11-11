import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { tap, firstValueFrom } from 'rxjs';

import { MaterialsFacade } from '@users/materials/data-access';

import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  standalone: true,
  selector: 'app-materials-add-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-add-button.component.html',
  styleUrl: './materials-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Input() folderId!: number;
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  async openDialog() {
    const materials = await firstValueFrom(this.materialsFacade.getMaterialsByFolder(this.folderId));

    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '500px',
      data: { folderId: this.folderId, materials },
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result) => {
          if (result) {
            this.materialsFacade.addMaterial(result);
          }
        }),
      )
      .subscribe();
  }
}
