import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesService } from '@services/employees.service';

import { EmployeesComponent } from '@components/employees/employees.component';
import { EmployeesListComponent } from '@components/employees/employees-list/employees-list.component';
import { EmployeesDetailComponent } from '@components/employees/employees-detail/employees-detail.component';
import { EmployeesFormComponent } from '@components/employees/employees-form/employees-form.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesDetailComponent,
    EmployeesFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    EmployeesService
  ],
  entryComponents: [EmployeesFormComponent, EmployeesDetailComponent]
})
export class EmployeesModule { }
