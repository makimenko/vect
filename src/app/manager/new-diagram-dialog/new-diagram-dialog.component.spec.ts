import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiagramDialogComponent } from './new-diagram-dialog.component';

describe('NewDiagramDialogComponent', () => {
  let component: NewDiagramDialogComponent;
  let fixture: ComponentFixture<NewDiagramDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDiagramDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDiagramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
