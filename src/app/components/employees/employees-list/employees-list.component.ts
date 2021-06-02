import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesFormComponent } from '../employees-form/employees-form.component';
import { Employee } from '@models/employee';
import { EmployeesDetailComponent } from '../employees-detail/employees-detail.component';
import { AppSettingsService } from '@services/app-settings.service';
import { EmployeesService } from '@services/employees.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  employees: Employee[] = [];
  employeesFiltered: Employee[] = [];
  isLoadingData = false;
  searchText = '';

  dtTrigger = new Subject();
  dtOptions: any = {
    info: true,
    lengthChange: false,
    processing: true,
    searching: false,
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 15,
    dom: '<"html5buttons"B>lftip',
    buttons: [
      { extend: 'copy', className: 'btn-sm' },
      { extend: 'csv', title: 'Lista de trabajadores', className: 'btn-sm' },
      { extend: 'excel', title: 'Lista de trabajadores', className: 'btn-sm' },
      { extend: 'pdf', title: 'Lista de trabajadores', className: 'btn-sm' },
      { extend: 'print', title: 'Lista de trabajadores', className: 'btn-sm',
        customize(win): void {
              $(win.document.body).addClass('white-bg');
              $(win.document.body).css('font-size', '10px');
              $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
        }
      }
    ],
    language: {
      emptyTable: 'No hay datos disponibles',
      info: 'Mostrando desde _START_ hasta _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando desde 0 hasta 0 de 0 registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      paginate: {
        first: 'Ini.',
        last: 'Fin',
        next: 'Sig.',
        previous: 'Ant.'
      }
    },
    columnDefs: [
      { targets: 0, responsivePriority: 10001 },
      { targets: 1, responsivePriority: 1 },
      { targets: 2, responsivePriority: 3 },
      { targets: 3, orderable: false, responsivePriority: 2 }
    ]
  };

  constructor(private modalService: NgbModal, public appSettingsService: AppSettingsService, private employeesService: EmployeesService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadEmployees();
  }

  add(): void {
    const modalForm = this.modalService.open(EmployeesFormComponent);
    modalForm.result.then(
      this.onCloseModalForm.bind(this),
      this.onCloseModalForm.bind(this)
    );
  }

  edit(employee: Employee): void {
    const modalForm = this.modalService.open(EmployeesFormComponent);
    modalForm.result.then(
      this.onCloseModalForm.bind(this),
      this.onCloseModalForm.bind(this)
    );
    modalForm.componentInstance.createMode = false;
    modalForm.componentInstance.employeeSelected = employee;
  }

  view(employee: Employee): void {
    const modalForm = this.modalService.open(EmployeesDetailComponent, { size: 'lg' });
    modalForm.result.then(
      this.onCloseModalForm.bind(this),
      this.onCloseModalForm.bind(this)
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

  onCloseModalForm(response: any): void {
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
    this.isLoadingData = true;
    this.employeesService.getAll().subscribe(
      collection => {
        this.employees = [];
        collection.docs.forEach(doc => {
          const employee = this.employeesService.setEmployee(doc.id, doc.data());
          this.employees.push(employee);
        });
      },
      error => {
        console.error(error);
      },
      () => {
        this.isLoadingData = false;
        this.filterData();
      });
  }

  filterData(): void {
    if (this.searchText) {
      const searchTextUpper = this.searchText.toUpperCase();
      this.employeesFiltered = this.employees.filter(obj =>
        obj.dni.includes(searchTextUpper)
        || obj.firstName.toUpperCase().includes(searchTextUpper)
        || obj.lastName.toUpperCase().includes(searchTextUpper));
    } else {
      this.employeesFiltered = this.employees;
    }
    if (this.isLoadingData) {
      this.isLoadingData = false;
    }
    this.dtRender();
  }

  dtRender() {
    if("dtInstance" in this.dtElement){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else{
      this.dtTrigger.next();
    } 
  }

}
