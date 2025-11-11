import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';

import { FoldersConfirmDialogComponent } from '../folders-confirm-dialog/folders-confirm-dialog.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  standalone: true,
  selector: 'app-folders-list-container',
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrl: './folders-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly folders$ = this.materialsFacade.folders$;
  readonly loading$ = this.materialsFacade.loading$;
  readonly error$ = this.materialsFacade.error$;

  constructor() {
    this.materialsFacade.loadFolders();
  }

  openFolder(folder: Folder) {
    this.router.navigate([`/materials/folder`, folder.id]);
  }

  deleteFolder(folder: Folder) {
    const dialogRef = this.dialog.open(FoldersConfirmDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить ${folder.title}?` },
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((confirmed: boolean) => {
          if (confirmed) this.materialsFacade.deleteFolder(folder.id);
        }),
      )
      .subscribe();
  }
}
