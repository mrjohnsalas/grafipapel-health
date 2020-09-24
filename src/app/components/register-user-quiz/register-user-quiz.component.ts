import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from '@services/app-settings.service';
import { EmployeesService } from '@services/employees.service';
import { QuizzesService } from '@services/quizzes.service';
import { UserQuizzesService } from '@services/user-quizzes.service';

import { Employee } from '@models/employee';
import { Pager } from '@models/pager';
import { Question } from '@models/question';
import { Option } from '@models/option';
import { Quiz } from '@models/quiz';
import { QuizStep } from '@models/quiz-step';
import { UserQuiz } from '@models/user-quiz';

@Component({
  selector: 'app-register-user-quiz',
  templateUrl: './register-user-quiz.component.html',
  styleUrls: ['./register-user-quiz.component.css']
})
export class RegisterUserQuizComponent implements OnInit {

  quiz: Quiz;
  pager = new Pager(0, 1, 1);
  withError = false;
  errorMessage: string;
  employee: Employee;
  isLoadingData = false;
  selectedOption = false;
  quizStep = QuizStep.Init;
  parentPath = 'userquizzes/form';

  constructor(private quizzesService: QuizzesService, private employeesService: EmployeesService,
              private userQuizzesService: UserQuizzesService, public appSettingsService: AppSettingsService) { }

  ngOnInit(): void {
    this.quizStep = QuizStep.Init;
  }

  checkEmployee(dni: string): void {
    this.cleanError();
    if (this.checkDni(dni)) {
      this.isLoadingData = true;
      // CHECK EMPLOYEE
      this.employeesService.getByDni(dni).subscribe(
        collection => {
          const doc = collection.docs[0];
          if (doc === undefined) {
            this.setError('No se encontró ningún trabajador con el DNI ingresado. Verifique y vuelva a intentarlo.');
          } else {
            this.employee = this.employeesService.setEmployee(doc.id, doc.data());
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
          this.loadQuiz();
        } else {
          this.setError('Usted ya registró su ficha de sintomatología. Verifique y vuelva a intentarlo.');
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

  loadQuiz(): void {
    this.cleanError();
    this.isLoadingData = true;
    this.quizzesService.get().subscribe(
      doc => {
        const data = doc.data();
        if (data === undefined) {
          this.setError('No se encontró la ficha de sintomatología. Comuníquese con el área de sistemas.');
        } else {
          this.quiz = {
            id: doc.id,
            name: data.name,
            description: data.description,
            questions: data.questions
          };
          this.pager.count = this.quiz.questions.length;
          this.quizStep = QuizStep.Quiz;
        }
      },
      error => {
        this.setError(error);
      },
      () => {
        this.isLoadingData = false;
        console.log('LoadQuiz finish');
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

  get filteredQuestions(): Question[] {
    return this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size);
  }

  onSelect(question: Question, option: Option): void {
    this.selectedOption = option.selected;
    question.options.forEach((opt) => { if (opt.id !== option.id) { opt.selected = false; }});
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.selectedOption = false;
      this.pager.completed = (100 / this.pager.count) * this.pager.index;
      this.pager.completedPercent = Math.round(this.pager.completed).toString();
    }
  }

  onSubmit(): void {
    const userQuiz = new UserQuiz();
    userQuiz.date = new Date();
    userQuiz.employeeId = this.employee.id;
    userQuiz.quiz = this.quiz;
    this.userQuizzesService.create(userQuiz)
      .then(response => {
        this.quizStep = QuizStep.End;
        console.log('UserQuiz saved: ' + response.id);
        // CHECK USERQUIZ
        if (this.getYesCount(userQuiz) > 0) {
          this.employee.canEnter = false;
          this.employeesService.edit(this.employee)
            .then(() => {
              console.log('Employee edited');
            })
            .catch(error => console.error(error));
        }
      })
      .catch(error => console.error(error));
  }

  getYesCount(userQuiz: UserQuiz): number {
    let yesCount = 0;
    userQuiz.quiz.questions.forEach(
      q => {
        q.options.forEach(
          o => {
            if (o.id === 1 && o.selected) {
              yesCount++;
            }
          }
        );
      }
    );
    return yesCount;
  }

  restart(): void {
    this.quiz = undefined;
    this.pager = new Pager(0, 1, 1);
    this.employee = undefined;
    this.isLoadingData = false;
    this.selectedOption = false;
    this.cleanError();
    this.quizStep = QuizStep.Init;
  }

}
