import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAddEditComponent } from './house-add-edit.component';

describe('HouseAddEditComponent', () => {
  let component: HouseAddEditComponent;
  let fixture: ComponentFixture<HouseAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
