import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Folder } from '@users/materials/data-access';

import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  standalone: true,
  selector: 'app-folders-list',
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input() folders: Folder[] | null = [];
  @Output() folderOpened = new EventEmitter<Folder>();
  @Output() deleteFolder = new EventEmitter<Folder>();

  openFolder(folder: Folder) {
    this.folderOpened.emit(folder);
  }

  removeFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }
}
