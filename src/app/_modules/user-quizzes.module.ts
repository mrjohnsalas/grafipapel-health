import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserQuizzesRoutingModule } from './user-quizzes-routing.module';
import { UserQuizzesService } from '@services/user-quizzes.service';

import { UserQuizzesComponent } from '@components/user-quizzes/user-quizzes.component';
import { UserQuizzesListComponent } from '@components/user-quizzes/user-quizzes-list/user-quizzes-list.component';
import { UserQuizzesDetailComponent } from '@components/user-quizzes/user-quizzes-detail/user-quizzes-detail.component';
import { UserQuizzesFormComponent } from '@components/user-quizzes/user-quizzes-form/user-quizzes-form.component';
import { UserQuizzesSearchComponent } from '@components/user-quizzes/user-quizzes-search/user-quizzes-search.component';

@NgModule({
  declarations: [
    UserQuizzesComponent,
    UserQuizzesListComponent,
    UserQuizzesDetailComponent,
    UserQuizzesFormComponent,
    UserQuizzesSearchComponent
  ],
  imports: [
    CommonModule,
    UserQuizzesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserQuizzesService
  ]
})
export class UserQuizzesModule { }
