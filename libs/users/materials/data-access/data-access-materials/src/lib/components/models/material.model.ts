export interface Material {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
  type?: 'video' | 'pdf' | 'audio';
}

export interface CreateMaterialDto {
  title: string;
  material_link: string;
  folder_id: number;
  type: string;
}
