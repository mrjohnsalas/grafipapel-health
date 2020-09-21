import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Quiz } from '@models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private db: AngularFirestore) { }

  private quizCollectionName = 'quiz';

  // return collection of documents
  getAll(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Quiz>(this.quizCollectionName).get();
  }

  // return one document
  get(): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.db.collection<Quiz>(this.quizCollectionName).doc('EwOcGvGooEVdcT9nlp1V').get();
  }
}
