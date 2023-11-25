import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomeComponent } from './login-home.component';

describe('LoginHomeComponent', () => {
  let component: LoginHomeComponent;
  let fixture: ComponentFixture<LoginHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHomeComponent]
    });
    fixture = TestBed.createComponent(LoginHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
