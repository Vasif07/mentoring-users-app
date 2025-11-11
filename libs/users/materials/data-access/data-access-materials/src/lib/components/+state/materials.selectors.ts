import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MaterialsState } from './materials.reducer';
import { Folder } from '../models/folders.model';
import { Material } from '../models/material.model';

export const selectMaterialsState = createFeatureSelector<MaterialsState>('materials');

export const selectAllMaterials = createSelector(selectMaterialsState, (state) => state.materials);

export const selectMaterialsLoading = createSelector(selectMaterialsState, (state) => state.loading);

export const selectMaterialsError = createSelector(selectMaterialsState, (state) => state.error);

export const selectMaterialById = (materialId: number) =>
  createSelector(selectAllMaterials, (materials: Material[]) => materials.find((m) => m.id === materialId));

export const selectMaterialsByTitle = (title: string) =>
  createSelector(selectAllMaterials, (materials: Material[]) =>
    materials.filter((m) => m.title.toLowerCase().includes(title.toLowerCase())),
  );

export const selectAllFolders = createSelector(selectMaterialsState, (state) => state.folders);

export const selectFolderById = (folderId: number) =>
  createSelector(selectAllFolders, (folders: Folder[]) => folders.find((f) => f.id === folderId));

export const selectMaterialsByFolderId = (folderId: number) =>
  createSelector(selectAllMaterials, (materials: Material[]) =>
    materials.filter((m) => Number(m.folder_id) === Number(folderId)),
  );
