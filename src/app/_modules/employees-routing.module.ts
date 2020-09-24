import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesDetailComponent } from '@components/employees/employees-detail/employees-detail.component';
import { EmployeesFormComponent } from '@components/employees/employees-form/employees-form.component';
import { EmployeesListComponent } from '@components/employees/employees-list/employees-list.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', component: EmployeesListComponent, data: { breadcrumb: null } },
      { path: 'detail/:id', component: EmployeesDetailComponent, data: { breadcrumb: 'Detalle' } },
      { path: 'delete/:id', component: EmployeesDetailComponent, data: { breadcrumb: 'Eliminar' } },
      { path: 'create', component: EmployeesFormComponent, data: { breadcrumb: 'Nuevo' } },
      { path: 'edit/:id', component: EmployeesFormComponent, data: { breadcrumb: 'Editar' } }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
