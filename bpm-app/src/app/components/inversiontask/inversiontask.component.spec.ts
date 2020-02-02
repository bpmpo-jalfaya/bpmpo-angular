import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InversiontaskComponent } from './inversiontask.component';

describe('InversiontaskComponent', () => {
  let component: InversiontaskComponent;
  let fixture: ComponentFixture<InversiontaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InversiontaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InversiontaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
