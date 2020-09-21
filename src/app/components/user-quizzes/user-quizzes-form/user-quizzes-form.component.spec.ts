import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesFormComponent } from './user-quizzes-form.component';

describe('UserQuizzesFormComponent', () => {
  let component: UserQuizzesFormComponent;
  let fixture: ComponentFixture<UserQuizzesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizzesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
