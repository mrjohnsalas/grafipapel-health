import { Injectable } from '@angular/core';
import { QuizStep } from '@models/quiz-step';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor() { }

  readonly quizStep = QuizStep;

  readonly Elements = 'Elementos';
  readonly RequiredErrorMessage = 'Este campo es requerido.';
  readonly RequiredValidEmailErrorMessage = 'El valor ingresado no es un email valido.';
  readonly MinLengthErrorMessage = 'La longitud mínima de caracteres de este campo es:';
  readonly MaxLengthErrorMessage = 'La longitud máxima de caracteres de este campo es:';
}
