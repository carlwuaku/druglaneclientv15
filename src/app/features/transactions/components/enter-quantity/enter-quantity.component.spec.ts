import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterQuantityComponent } from './enter-quantity.component';

describe('EnterQuantityComponent', () => {
  let component: EnterQuantityComponent;
  let fixture: ComponentFixture<EnterQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
