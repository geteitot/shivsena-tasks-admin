import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmatioonDialogComponent } from './confirmatioon-dialog.component';

describe('ConfirmatioonDialogComponent', () => {
  let component: ConfirmatioonDialogComponent;
  let fixture: ComponentFixture<ConfirmatioonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmatioonDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmatioonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
