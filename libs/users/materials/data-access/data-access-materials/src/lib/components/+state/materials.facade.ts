import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { selectMaterialsByFolderId } from './materials.selectors';
import { CreateFolderDto } from '../models/folders.model';
import { CreateMaterialDto } from '../models/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  readonly materials$ = this.store.select(MaterialsSelectors.selectAllMaterials);
  readonly folders$ = this.store.select(MaterialsSelectors.selectAllFolders);
  readonly loading$ = this.store.select(MaterialsSelectors.selectMaterialsLoading);
  readonly error$ = this.store.select(MaterialsSelectors.selectMaterialsError);

  loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  addMaterial(material: CreateMaterialDto): void {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  getMaterialsByFolder(folderId: number) {
    return this.store.select(selectMaterialsByFolderId(folderId));
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(folder: CreateFolderDto): void {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }
}
