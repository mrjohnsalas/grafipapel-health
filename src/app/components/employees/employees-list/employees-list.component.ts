import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesFormComponent } from '../employees-form/employees-form.component';
import { EmployeesService } from '@services/employees.service';
import { Employee } from '../../../_models/employee';
import { EmployeesDetailComponent } from '../employees-detail/employees-detail.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private modalService: NgbModal, private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  addEmployee(): void {
    const modalForm = this.modalService.open(EmployeesFormComponent);
    modalForm.result.then(
      this.handleModalFormclose.bind(this),
      this.handleModalFormclose.bind(this)
    );
  }

  edit(employee: Employee): void {
    const modalForm = this.modalService.open(EmployeesFormComponent);
    modalForm.result.then(
      this.handleModalFormclose.bind(this),
      this.handleModalFormclose.bind(this)
    );
    modalForm.componentInstance.createMode = false;
    modalForm.componentInstance.employeeSelected = employee;
  }

  view(employee: Employee): void {
    const modalForm = this.modalService.open(EmployeesDetailComponent);
    modalForm.result.then(
      this.handleModalFormclose.bind(this),
      this.handleModalFormclose.bind(this)
    );
    modalForm.componentInstance.employeeSelected = employee;
  }

  delete(id: string, index: number): void {
    this.employeesService.delete(id)
      .then(() => {
        this.employees.splice(index, 1);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleModalFormclose(response): void {
    if (response === Object(response)) {
      if (response.createMode) {
        response.employee.id = response.id;
        this.employees.unshift(response.employee);
      } else {
        const index = this.employees.findIndex(x => x.id == response.id);
        this.employees[index] = response.employee;
      }
    }
  }

  loadEmployees(): void {
    this.employeesService.getAll().subscribe(collection => {
      this.employees = [];
      collection.docs.forEach(doc => {
        const data = doc.data();
        const employee: Employee = {
          id: doc.id,
          dni: data.dni,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          dateOfBirth: data.dateOfBirth.toDate(),
          grafipapelId: data.grafipapelId,
          canEnter: data.canEnter,
          employeeType: data.employeeType,
          statusType: data.statusType
        };
        this.employees.push(employee);
      });
    });
  }

}
