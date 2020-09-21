import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesSearchComponent } from './user-quizzes-search.component';

describe('UserQuizzesSearchComponent', () => {
  let component: UserQuizzesSearchComponent;
  let fixture: ComponentFixture<UserQuizzesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizzesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
