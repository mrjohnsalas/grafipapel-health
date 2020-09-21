import { Component, OnInit } from '@angular/core';
import { Employee } from '@models/employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {

  employeeSelected: Employee;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
