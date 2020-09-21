import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UserQuiz } from '@models/user-quiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuizzesService {

  constructor(private db: AngularFirestore) { }

  private userQuizCollectionName = 'userQuizzes';

  getAll(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<UserQuiz>(this.userQuizCollectionName).get();
  }

  getByEmployeeIdAndToday(employeeId: string): Observable<firebase.firestore.QuerySnapshot> {
    let tempDate = new Date();
    let today = new Date(tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate());
    let tomorrow = new Date(tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate());
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.db.collection<UserQuiz>(this.userQuizCollectionName, ref =>
      ref.where('employeeId', '==', employeeId).where('date', '>=', today).where('date', '<', tomorrow)).get();
  }

  create(userQuiz: UserQuiz): Promise<DocumentReference> {
    return this.db.collection(this.userQuizCollectionName).add({...userQuiz});
  }

  setUserQuiz(id: string, data: firebase.firestore.DocumentData): UserQuiz {
    const obj: UserQuiz = {
      id,
      date: data.date.toDate(),
      employeeId: data.employeeId,
      quiz: data.quiz
    };
    return obj;
  }
}
