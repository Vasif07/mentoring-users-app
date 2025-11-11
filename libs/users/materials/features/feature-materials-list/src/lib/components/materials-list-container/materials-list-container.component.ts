import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { MaterialsFacade, Material, Folder, getMaterialType } from '@users/materials/data-access';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

import { MaterialsConfirmDialogComponent } from '../materials-confirm-dialog/materials-confirm-dialog.component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  standalone: true,
  selector: 'app-materials-list-container',
  imports: [
    CommonModule,
    MatProgressBarModule,
    MaterialsListComponent,
    MaterialsAddButtonComponent,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrl: './materials-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  folderId!: number;
  folder$!: Observable<Folder | null>;
  materials$ = this.materialsFacade.materials$;
  filteredMaterials$ = this.materialsFacade.getMaterialsByFolder(this.folderId);

  readonly loading$ = this.materialsFacade.loading$;
  readonly error$ = this.materialsFacade.error$;

  ngOnInit(): void {
    this.folderId = Number(this.route.snapshot.paramMap.get('id'));
    this.materialsFacade.loadMaterials();
    this.materialsFacade.loadFolders();
    this.filteredMaterials$ = this.materialsFacade.getMaterialsByFolder(this.folderId);
    this.folder$ = this.materialsFacade.folders$.pipe(
      map((folders) => folders.find((f) => f.id === this.folderId) ?? null),
    );
  }

  openMaterial(material: Material) {
    const type = getMaterialType(material);

    this.dialog.open(MaterialsContentComponent, {
      data: { material, type },
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
    });
  }

  deleteMaterial(material: Material) {
    const dialogRef = this.dialog.open(MaterialsConfirmDialogComponent, {
      data: { message: `Вы уверены, что хотите удалить "${material.title}"?` },
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((confirmed: boolean) => {
          if (confirmed) this.materialsFacade.deleteMaterial(material.id);
        }),
      )
      .subscribe();
  }
}
