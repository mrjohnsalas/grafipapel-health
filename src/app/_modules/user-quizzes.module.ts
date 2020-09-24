import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { UserQuizzesRoutingModule } from './user-quizzes-routing.module';
import { UserQuizzesService } from '@services/user-quizzes.service';

import { UserQuizzesComponent } from '@components/user-quizzes/user-quizzes.component';
import { UserQuizzesListComponent } from '@components/user-quizzes/user-quizzes-list/user-quizzes-list.component';
import { UserQuizzesDetailComponent } from '@components/user-quizzes/user-quizzes-detail/user-quizzes-detail.component';

@NgModule({
  declarations: [
    UserQuizzesComponent,
    UserQuizzesListComponent,
    UserQuizzesDetailComponent
  ],
  imports: [
    CommonModule,
    UserQuizzesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    UserQuizzesService
  ],
  entryComponents: [UserQuizzesDetailComponent]
})
export class UserQuizzesModule { }
