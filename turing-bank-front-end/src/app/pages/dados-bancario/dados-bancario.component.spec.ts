import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosBancarioComponent } from './dados-bancario.component';

describe('DadosBancarioComponent', () => {
  let component: DadosBancarioComponent;
  let fixture: ComponentFixture<DadosBancarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosBancarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosBancarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
