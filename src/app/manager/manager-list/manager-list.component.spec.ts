import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListComponent } from './manager-list.component';

describe('ManagerListComponent', () => {
  let component: ManagerListComponent;
  let fixture: ComponentFixture<ManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
