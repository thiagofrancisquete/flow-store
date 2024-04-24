import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantesFormComponent } from './fabricantes-form.component';

describe('FabricantesFormComponent', () => {
  let component: FabricantesFormComponent;
  let fixture: ComponentFixture<FabricantesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricantesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
