import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { RegisterUserQuizComponent } from '@components/register-user-quiz/register-user-quiz.component';
import { SearchUserQuizComponent } from '@components/search-user-quiz/search-user-quiz.component';

const routes: Routes = [
  { path: '', component: RegisterUserQuizComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'registeruserquiz', component: RegisterUserQuizComponent},
  { path: 'searchuserquiz', component: SearchUserQuizComponent},
  {
    path: 'userquizzes',
    loadChildren: () => import('@modules/user-quizzes.module').then(module => module.UserQuizzesModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('@modules/employees.module').then(module => module.EmployeesModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
