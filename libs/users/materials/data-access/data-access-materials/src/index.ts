export { MaterialsFacade } from './lib/components/+state/materials.facade';
export { materialsReducer } from './lib/components/+state/materials.reducer';
export * as MaterialsEffects from './lib/components/+state/materials.effects';
export * as MaterialsSelectors from './lib/components/+state/materials.selectors';
export { Material, CreateMaterialDto } from './lib/components/models/material.model';
export { Folder, CreateFolderDto } from './lib/components/models/folders.model';
export { MATERIALS_FEATURE_KEY } from './lib/components/constants/materials-feature-key.constant';
export { getMaterialType } from './lib/components/utils/material-type.util';
