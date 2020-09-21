import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '@models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private db: AngularFirestore) { }

  private employeeCollectionName = 'employees';

  getAll(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Employee>(this.employeeCollectionName).get();
  }

  getByDni(dni: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Employee>(this.employeeCollectionName, ref => ref.where('dni', '==', dni)).get();
  }

  create(employee: Employee): Promise<DocumentReference> {
    return this.db.collection(this.employeeCollectionName).add({...employee});
  }

  edit(employee: Employee): Promise<void> {
    return this.db.collection(this.employeeCollectionName).doc(employee.id).update(employee);
  }

  partialEdit(id: string, obj: any): Promise<void> {
    return this.db.collection(this.employeeCollectionName).doc(id).update(obj);
  }

  delete(id: string): Promise<void> {
    return this.db.collection(this.employeeCollectionName).doc(id).delete();
  }

  setEmployee(id: string, data: firebase.firestore.DocumentData): Employee {
    const obj: Employee = {
      id,
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
    return obj;
  }

}
