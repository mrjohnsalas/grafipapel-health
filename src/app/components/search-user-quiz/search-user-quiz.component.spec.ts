import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserQuizComponent } from './search-user-quiz.component';

describe('SearchUserQuizComponent', () => {
  let component: SearchUserQuizComponent;
  let fixture: ComponentFixture<SearchUserQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUserQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
