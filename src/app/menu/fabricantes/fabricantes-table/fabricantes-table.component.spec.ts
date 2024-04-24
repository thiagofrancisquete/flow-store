import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantesTableComponent } from './fabricantes-table.component';

describe('FabricantesTableComponent', () => {
  let component: FabricantesTableComponent;
  let fixture: ComponentFixture<FabricantesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricantesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
