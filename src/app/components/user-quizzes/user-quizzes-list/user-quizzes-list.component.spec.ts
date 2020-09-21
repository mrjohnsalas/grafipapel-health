import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesListComponent } from './user-quizzes-list.component';

describe('UserQuizzesListComponent', () => {
  let component: UserQuizzesListComponent;
  let fixture: ComponentFixture<UserQuizzesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizzesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
