import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ApiService } from '@core/data-access-api';

import * as MaterialsActions from './materials.actions';
import { Folder } from '../models/folders.model';
import { Material, CreateMaterialDto } from '../models/material.model';

export const loadFolders = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadFolders),
      switchMap(() =>
        apiService.get<Folder[]>('/folder').pipe(
          map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
          catchError((error) => of(MaterialsActions.loadFoldersFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addFolder),
      tap(({ folder }) => console.log('🟢 Effect triggered with folder:', folder)),
      switchMap(({ folder }) =>
        apiService.post<Folder, Partial<Folder>>('/folder', folder).pipe(
          tap((response) => console.log('✅ API addFolder response:', response)),
          map((newFolder) => MaterialsActions.addFolderSuccess({ folder: newFolder })),
          catchError((error) => {
            console.error('❌ API addFolder error:', error);
            return of(MaterialsActions.addFolderFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => MaterialsActions.deleteFolderSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteFolderFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadMaterials = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.loadMaterials),
      switchMap(() =>
        apiService.get<Material[]>('/material').pipe(
          map((materials) => MaterialsActions.loadMaterialsSuccess({ materials })),
          catchError((error) => of(MaterialsActions.loadMaterialsFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      switchMap(({ material }) =>
        apiService.post<Material, CreateMaterialDto>('/material', material).pipe(
          map((newMaterial) => MaterialsActions.addMaterialSuccess({ material: newMaterial })),
          catchError((error) => of(MaterialsActions.addMaterialFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      switchMap(({ id }) =>
        apiService.delete<void>(`/material/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSuccess({ id })),
          catchError((error) => of(MaterialsActions.deleteMaterialFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
