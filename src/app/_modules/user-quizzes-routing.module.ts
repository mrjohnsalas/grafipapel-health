import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

import { UserQuizzesListComponent } from '@components/user-quizzes/user-quizzes-list/user-quizzes-list.component';
import { UserQuizzesDetailComponent } from '@components/user-quizzes/user-quizzes-detail/user-quizzes-detail.component';
import { UserQuizzesFormComponent } from '@components/user-quizzes/user-quizzes-form/user-quizzes-form.component';
import { UserQuizzesSearchComponent } from '@components/user-quizzes/user-quizzes-search/user-quizzes-search.component';

const routes: Routes = [
  { path: '',
    children: [
        { path: '', component: UserQuizzesFormComponent, data: { breadcrumb: null } },
        { path: 'create', component: UserQuizzesFormComponent, data: { breadcrumb: 'Nuevo' } },
        { path: 'search', component: UserQuizzesSearchComponent, data: { breadcrumb: 'Buscar' } }
    //   { path: '', component: UserQuizzesListComponent, data: { breadcrumb: null } },
    //   { path: 'detail/:id', component: UserQuizzesDetailComponent, data: { breadcrumb: 'Detalle' } },
    //   { path: 'delete/:id', component: UserQuizzesDetailComponent, data: { breadcrumb: 'Eliminar' } },
    //   { path: 'edit/:id', component: UserQuizzesFormComponent, data: { breadcrumb: 'Editar' } }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserQuizzesRoutingModule { }
