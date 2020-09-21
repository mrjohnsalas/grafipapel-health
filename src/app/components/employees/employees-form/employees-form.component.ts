import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StatusType } from '@models/status-type';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingsService } from '@services/app-settings.service';
import { EmployeesService } from '@services/employees.service';
import { Employee } from '../../../_models/employee';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  form: FormGroup;
  createMode = true;
  employeeSelected: Employee;

  dniLength: 8;
  grafipapelIdLength: 5;
  firstNameMaxLength: 50;
  lastNameMaxLength: 50;
  addressMaxLength: 100;
  phoneLength: 9;

  constructor(public appSettingsService: AppSettingsService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
              private employeesService: EmployeesService) { }

  get dni(): AbstractControl {
    return this.form.get('dni');
  }
  get grafipapelId(): AbstractControl {
    return this.form.get('grafipapelId');
  }

  get firstName(): AbstractControl {
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName');
  }

  get address(): AbstractControl {
    return this.form.get('address');
  }

  get phone(): AbstractControl {
    return this.form.get('phone');
  }

  get dateOfBirth(): AbstractControl {
    return this.form.get('dateOfBirth');
  }

  get employeeType(): AbstractControl {
    return this.form.get('employeeType');
  }

  get canEnter(): AbstractControl {
    return this.form.get('canEnter');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(this.dniLength), Validators.maxLength(this.dniLength)]],
      grafipapelId: ['', [Validators.required, Validators.minLength(this.grafipapelIdLength), Validators.maxLength(this.grafipapelIdLength)]],
      firstName: ['', [Validators.required, Validators.maxLength(this.firstNameMaxLength)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.lastNameMaxLength)]],
      address: ['', [Validators.maxLength(this.addressMaxLength)]],
      phone: ['', [Validators.minLength(this.phoneLength), Validators.maxLength(this.phoneLength)]],
      dateOfBirth: ['', [Validators.required]],
      employeeType: ['', [Validators.required]],
      canEnter: [true]
    });

    if (!this.createMode) {
      this.loadEmployee(this.employeeSelected);
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const employee: Employee = this.form.value;
    if (this.createMode) {
      employee.statusType = StatusType.Activo;
      this.employeesService.create(employee)
        .then(doc => {
          this.onSuccessSave(employee, doc);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.employeesService.edit(employee)
        .then(doc => {
          this.onSuccessSave(employee);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  onSuccessSave(employee: Employee, doc?: DocumentReference): void {
    this.activeModal.dismiss({ employee, id: employee ? employee.id : doc.id, createMode: this.createMode });
  }

  loadEmployee(employee: Employee): void {
    this.form.patchValue(employee);
  }

}
