import { EmployeeType } from './employee-type';
import { StatusType } from './status-type';

export class Employee {
    id?: string;
    dni: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: Date;
    grafipapelId: string;
    canEnter: boolean;
    employeeType: EmployeeType;
    statusType: StatusType;
}
