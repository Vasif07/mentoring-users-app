import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { getMaterialType, Material } from '@users/materials/data-access';

@Component({
  standalone: true,
  selector: 'app-materials-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrl: './materials-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material!: Material;
  @Output() open = new EventEmitter<Material>();
  @Output() delete = new EventEmitter<Material>();

  getType(material: Material) {
    return getMaterialType(material);
  }

  getIcon(material: Material): string {
    switch (this.getType(material)) {
      case 'video':
        return 'videocam';
      case 'audio':
        return 'audiotrack';
      case 'pdf':
        return 'picture_as_pdf';
      default:
        return 'insert_drive_file';
    }
  }

  onOpen() {
    this.open.emit(this.material);
  }

  onDelete() {
    this.delete.emit(this.material);
  }
}
