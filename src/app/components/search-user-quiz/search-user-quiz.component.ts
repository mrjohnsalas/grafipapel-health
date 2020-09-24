import { Component, OnInit } from '@angular/core';
import { Employee } from '@models/employee';
import { QuizStep } from '@models/quiz-step';
import { UserQuiz } from '@models/user-quiz';

import { AppSettingsService } from '@services/app-settings.service';
import { EmployeesService } from '@services/employees.service';
import { UserQuizzesService } from '@services/user-quizzes.service';

@Component({
  selector: 'app-search-user-quiz',
  templateUrl: './search-user-quiz.component.html',
  styleUrls: ['./search-user-quiz.component.css']
})
export class SearchUserQuizComponent implements OnInit {

  userQuiz: UserQuiz;
  withError = false;
  errorMessage: string;
  employee: Employee;
  isLoadingData = false;
  quizStep = QuizStep.Init;
  parentPath = 'userquizzes/search';

  constructor(private employeeService: EmployeesService, private userQuizzesService: UserQuizzesService,
              public appSettingsService: AppSettingsService) { }

  ngOnInit(): void {
    this.quizStep = QuizStep.Init;
  }

  checkEmployee(dni: string): void {
    this.cleanError();
    if (this.checkDni(dni)) {
      this.isLoadingData = true;
      // CHECK EMPLOYEE
      this.employeeService.getByDni(dni).subscribe(
        collection => {
          const doc = collection.docs[0];
          if (doc === undefined) {
            this.setError('No se encontró ningún trabajador con el DNI ingresado. Verifique y vuelva a intentarlo.');
          } else {
            this.employee = this.employeeService.setEmployee(doc.id, doc.data());
            this.checkUserQuiz(this.employee.id);
          }
        },
        error => {
          this.setError(error);
        },
        () => {
          this.isLoadingData = false;
          console.log('LoadEmployee finish');
        });
    }
  }

  checkUserQuiz(employeeId: string): void {
    this.cleanError();
    this.isLoadingData = true;
    this.userQuizzesService.getByEmployeeIdAndToday(employeeId).subscribe(
      collection => {
        const doc = collection.docs[0];
        if (doc === undefined) {
          this.setError('No se encontró ningún registro de hoy de la ficha de sintomatología con este DNI. Verifique y vuelva a intentarlo.');
        } else {
          this.quizStep = QuizStep.End;
        }
      },
      error => {
        this.setError(error);
      },
      () => {
        this.isLoadingData = false;
        console.log('LoadUserQuiz finish');
      });
  }

  cleanError(): void {
    this.errorMessage = '';
    this.withError = false;
  }

  setError(errorMessage: string): void {
    this.withError = true;
    this.errorMessage = errorMessage;
  }

  checkDni(value: string): boolean {
    this.cleanError();
    if (value.length !== 8) {
      this.setError('Ingrese un DNI valido. Verifique y vuelva a intentarlo.');
      return false;
    }
    if (value.match(/^[0-9]+$/)) {
      return true;
    } else {
      this.setError('Ingrese solo números. Verifique y vuelva a intentarlo.');
      return false;
    }
  }

  restart(): void {
    this.userQuiz = undefined;
    this.employee = undefined;
    this.isLoadingData = false;
    this.cleanError();
    this.quizStep = QuizStep.Init;
  }

}
