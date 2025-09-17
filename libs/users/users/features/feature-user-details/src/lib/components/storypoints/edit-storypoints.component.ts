import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-edit-storypoints',
  templateUrl: './edit-storypoints.component.html',
  styleUrls: ['./edit-storypoints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class EditStorypointsComponent implements OnChanges {
  @Input() totalStoryPoints = 0;
  private readonly snackBar = inject(MatSnackBar);
  public editing = false;
  public formgroup = new FormGroup({
    totalStoryPoints: new FormControl<number | null>({ value: null, disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/),
    ]),
  });
  @Output() confirmPoints = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalStoryPoints'] && !this.editing) {
      this.totalStoryPointsControl.setValue(this.totalStoryPoints ?? 0);
      this.totalStoryPointsControl.disable();
    }
  }

  get totalStoryPointsControl(): FormControl<number | null> {
    return this.formgroup.get('totalStoryPoints') as FormControl<number | null>;
  }

  startEditing() {
    this.editing = true;
    this.totalStoryPointsControl.enable();
  }

  confirm() {
    if (!this.formgroup.valid) return;

    const points = this.totalStoryPointsControl.value!;
    this.confirmPoints.emit(points);

    this.editing = false;
    this.totalStoryPointsControl.disable();

    this.snackBar.open('Сторипоинты сохранены', 'Закрыть', { duration: 3000 });
  }

  cancel() {
    this.editing = false;
    this.totalStoryPointsControl.setValue(this.totalStoryPoints ?? 0);
    this.totalStoryPointsControl.disable();
  }
}
