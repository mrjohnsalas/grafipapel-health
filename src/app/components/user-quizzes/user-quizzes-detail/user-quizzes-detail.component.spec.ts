import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesDetailComponent } from './user-quizzes-detail.component';

describe('UserQuizzesDetailComponent', () => {
  let component: UserQuizzesDetailComponent;
  let fixture: ComponentFixture<UserQuizzesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizzesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
