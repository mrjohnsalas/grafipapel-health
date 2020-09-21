import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserQuizzesFormComponent } from '@components/user-quizzes/user-quizzes-form/user-quizzes-form.component';

const routes: Routes = [
  { path: '', component: UserQuizzesFormComponent},
  {
    path: 'userquizzes',
    loadChildren: () => import('@modules/user-quizzes.module').then(module => module.UserQuizzesModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
