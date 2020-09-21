import { Injectable } from '@angular/core';
import { QuizStep } from '@models/quiz-step';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor() { }

  readonly quizStep = QuizStep;
}
