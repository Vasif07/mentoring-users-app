import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Folder } from '@users/materials/data-access';

@Component({
  standalone: true,
  selector: 'app-folders-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrl: './folders-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input() folder!: Folder;
  @Output() open = new EventEmitter<Folder>();
  @Output() delete = new EventEmitter<Folder>();

  onDoubleClick() {
    this.open.emit(this.folder);
  }

  onDeleteClick() {
    this.delete.emit(this.folder);
  }
}
