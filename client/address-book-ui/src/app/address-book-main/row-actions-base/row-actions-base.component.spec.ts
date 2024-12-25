import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowActionsBaseComponent } from './row-actions-base.component';

describe('RowActionsBaseComponent', () => {
  let component: RowActionsBaseComponent;
  let fixture: ComponentFixture<RowActionsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowActionsBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowActionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
