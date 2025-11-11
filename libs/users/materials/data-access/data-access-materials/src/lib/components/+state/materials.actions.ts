import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Folder } from '../models/folders.model';
import { Material, CreateMaterialDto } from '../models/material.model';

export const loadFolders = createAction('[Material] Load Folders');
export const loadFoldersSuccess = createAction('[Material] Load Folders Success', props<{ folders: Folder[] }>());
export const loadFoldersFailure = createAction(
  '[Material] Load Folders Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const addFolder = createAction('[Material] Add Folder', props<{ folder: Partial<Folder> }>());
export const addFolderSuccess = createAction('[Material] Add Folder Success', props<{ folder: Folder }>());
export const addFolderFailure = createAction('[Material] Add Folder Failure', props<{ error: HttpErrorResponse }>());

export const deleteFolder = createAction('[Material] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Material] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailure = createAction(
  '[Material] Delete Folder Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const loadMaterials = createAction('[Material] Load Materials');
export const loadMaterialsSuccess = createAction(
  '[Material] Load Materials Success',
  props<{ materials: Material[] }>(),
);
export const loadMaterialsFailure = createAction(
  '[Material] Load Materials Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const addMaterial = createAction('[Material] Add Material', props<{ material: CreateMaterialDto }>());
export const addMaterialSuccess = createAction('[Material] Add Material Success', props<{ material: Material }>());
export const addMaterialFailure = createAction(
  '[Material] Add Material Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteMaterial = createAction('[Material] Delete Material', props<{ id: number }>());
export const deleteMaterialSuccess = createAction('[Material] Delete Material Success', props<{ id: number }>());
export const deleteMaterialFailure = createAction(
  '[Material] Delete Material Failure',
  props<{ error: HttpErrorResponse }>(),
);
