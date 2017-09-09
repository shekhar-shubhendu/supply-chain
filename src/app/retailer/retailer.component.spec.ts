import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerComponent } from './retailer.component';

describe('RetailerComponent', () => {
  let component: RetailerComponent;
  let fixture: ComponentFixture<RetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
