import { Material } from '../models/material.model';

export function getMaterialType(material: Material): 'video' | 'audio' | 'pdf' | 'other' {
  const link = material.material_link.toLowerCase();
  if (link.includes('youtube.com') || link.includes('youtu.be')) return 'video';
  if (link.endsWith('.mp3')) return 'audio';
  if (link.endsWith('.pdf')) return 'pdf';
  return 'other';
}
