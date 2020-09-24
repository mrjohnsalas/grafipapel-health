import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserQuizComponent } from './register-user-quiz.component';

describe('RegisterUserQuizComponent', () => {
  let component: RegisterUserQuizComponent;
  let fixture: ComponentFixture<RegisterUserQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
