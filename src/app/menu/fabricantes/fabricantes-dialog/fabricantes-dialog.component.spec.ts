import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantesDialogComponent } from './fabricantes-dialog.component';

describe('FabricantesDialogComponent', () => {
  let component: FabricantesDialogComponent;
  let fixture: ComponentFixture<FabricantesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricantesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
