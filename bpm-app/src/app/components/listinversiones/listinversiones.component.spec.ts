import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinversionesComponent } from './listinversiones.component';

describe('ListinversionesComponent', () => {
  let component: ListinversionesComponent;
  let fixture: ComponentFixture<ListinversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListinversionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
