import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Material } from '@users/materials/data-access';

@Component({
  standalone: true,
  selector: 'app-materials-content',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  private readonly sanitizer = inject(DomSanitizer);
  public readonly data = inject(MAT_DIALOG_DATA) as { material: Material; type: string };

  getYoutubeId(): string {
    const match = this.data.material.material_link.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : '';
  }

  getYoutubeSafeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.getYoutubeId());
  }

  getPdfSafeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.material.material_link);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
