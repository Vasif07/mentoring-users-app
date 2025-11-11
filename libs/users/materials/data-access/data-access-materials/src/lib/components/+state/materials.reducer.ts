import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import { Material } from '../models/material.model';

export interface Folder {
  id: number;
  title: string;
}

export interface MaterialsState {
  materials: Material[];
  folders: Folder[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: MaterialsState = {
  materials: [],
  folders: [],
  loading: false,
  error: null,
};

const setLoading = (state: MaterialsState) => ({
  ...state,
  loading: true,
  error: null,
});

const setError = (state: MaterialsState, { error }: { error: HttpErrorResponse }) => ({
  ...state,
  loading: false,
  error,
});

export const materialsReducer = createReducer(
  initialState,

  on(
    MaterialsActions.loadMaterials,
    MaterialsActions.addMaterial,
    MaterialsActions.deleteMaterial,
    MaterialsActions.loadFolders,
    MaterialsActions.addFolder,
    MaterialsActions.deleteFolder,
    setLoading,
  ),

  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    loading: false,
    folders,
  })),
  on(MaterialsActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    loading: false,
    folders: [...state.folders, folder],
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    folders: state.folders.filter((f) => f.id !== id),
  })),

  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    loading: false,
    materials,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    ...state,
    loading: false,
    materials: [...state.materials, material],
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    materials: state.materials.filter((m) => m.id !== id),
  })),

  on(
    MaterialsActions.loadMaterialsFailure,
    MaterialsActions.addMaterialFailure,
    MaterialsActions.deleteMaterialFailure,
    MaterialsActions.loadFoldersFailure,
    MaterialsActions.addFolderFailure,
    MaterialsActions.deleteFolderFailure,
    setError,
  ),
);
