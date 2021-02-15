import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ManagerListItemComponent;
  let fixture: ComponentFixture<ManagerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
