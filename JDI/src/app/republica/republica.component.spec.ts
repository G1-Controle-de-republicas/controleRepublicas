import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepublicaComponent } from './republica.component';

describe('RepublicaComponent', () => {
  let component: RepublicaComponent;
  let fixture: ComponentFixture<RepublicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepublicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
