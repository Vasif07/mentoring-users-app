import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsConfirmDialogComponent } from './materials-confirm-dialog.component';

describe('MaterialsConfirmDialogComponent', () => {
  let component: MaterialsConfirmDialogComponent;
  let fixture: ComponentFixture<MaterialsConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
