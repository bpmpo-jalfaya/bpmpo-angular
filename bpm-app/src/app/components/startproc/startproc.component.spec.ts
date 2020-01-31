import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartprocComponent } from './startproc.component';

describe('StartprocComponent', () => {
  let component: StartprocComponent;
  let fixture: ComponentFixture<StartprocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartprocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
