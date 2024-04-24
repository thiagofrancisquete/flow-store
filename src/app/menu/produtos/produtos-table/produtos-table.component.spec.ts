import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosTableComponent } from './produtos-table.component';

describe('ProdutosTableComponent', () => {
  let component: ProdutosTableComponent;
  let fixture: ComponentFixture<ProdutosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
