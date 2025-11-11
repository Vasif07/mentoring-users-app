import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Material } from '@users/materials/data-access';

import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  standalone: true,
  selector: 'app-materials-list',
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input() materials: Material[] | null = [];
  @Output() materialOpened = new EventEmitter<Material>();
  @Output() deleteMaterial = new EventEmitter<Material>();

  openMaterial(material: Material) {
    this.materialOpened.emit(material);
  }

  removeMaterial(material: Material) {
    this.deleteMaterial.emit(material);
  }
}
