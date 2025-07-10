import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressView } from './address-view';

describe('AddressView', () => {
  let component: AddressView;
  let fixture: ComponentFixture<AddressView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
