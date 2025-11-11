import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';

import { MaterialsFacade } from '@users/materials/data-access';

import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  standalone: true,
  selector: 'app-folders-add-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrl: './folders-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  openDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      width: '300px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((folderTitle: string) => {
          console.log('dialog closed with:', folderTitle);
          if (folderTitle) {
            this.materialsFacade.addFolder({ title: folderTitle });
          }
        }),
      )
      .subscribe();
  }
}
