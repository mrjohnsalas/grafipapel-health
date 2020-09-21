import { TestBed } from '@angular/core/testing';

import { UserQuizzesService } from './user-quizzes.service';

describe('UserQuizzesService', () => {
  let service: UserQuizzesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserQuizzesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
