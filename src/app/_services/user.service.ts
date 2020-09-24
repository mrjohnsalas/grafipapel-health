import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  private userCollectionName = 'users';

  getByEmail(email: string): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<User>(this.userCollectionName, ref => ref.where('email', '==', email)).get();
  }

  setEmployee(id: string, data: firebase.firestore.DocumentData): User {
    const obj: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      roles: data.roles
    };
    return obj;
  }
}
