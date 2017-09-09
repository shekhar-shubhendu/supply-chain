import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorComponent } from './distributor.component';

describe('DistributorComponent', () => {
  let component: DistributorComponent;
  let fixture: ComponentFixture<DistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
