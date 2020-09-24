import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserQuizzesListComponent } from '@components/user-quizzes/user-quizzes-list/user-quizzes-list.component';
import { UserQuizzesDetailComponent } from '@components/user-quizzes/user-quizzes-detail/user-quizzes-detail.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: UserQuizzesListComponent, data: { breadcrumb: null } },
      { path: 'detail/:id', component: UserQuizzesDetailComponent, data: { breadcrumb: 'Detalle' } },
      { path: 'delete/:id', component: UserQuizzesDetailComponent, data: { breadcrumb: 'Eliminar' } },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserQuizzesRoutingModule { }
