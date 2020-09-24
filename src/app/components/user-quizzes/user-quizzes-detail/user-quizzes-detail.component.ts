import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserQuiz } from '@models/user-quiz';
import { Option } from '@models/option';
import { Question } from '@models/question';

@Component({
  selector: 'app-user-quizzes-detail',
  templateUrl: './user-quizzes-detail.component.html',
  styleUrls: ['./user-quizzes-detail.component.css']
})
export class UserQuizzesDetailComponent implements OnInit {

  userQuizSelected: UserQuiz;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  getOption(question: Question): Option {
    let optX: Option;
    question.options.forEach(opt => {
      if (opt.selected) {
        optX = opt;
      }
    });
    return optX;
  }

}
