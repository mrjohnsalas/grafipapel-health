import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  errorMessage: string;

  isAdmin = false;
  isSima = false;
  isVigilancia = false;

  constructor(private ngZone: NgZone, public afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      }
    });
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // login(email: string, password: string): User {
  //   let user: User;
  //   this.afAuth.signInWithEmailAndPassword(email, password)
  //     .then(response => {
  //       this.userService.getByEmail(email).subscribe(
  //         collection => {
  //           const doc = collection.docs[0];
  //           if (doc === undefined) {
  //             this.setError('No se encontró ningún trabajador con el DNI ingresado. Verifique y vuelva a intentarlo.');
  //           } else {
  //             this.employee = this.employeesService.setEmployee(doc.id, doc.data());
  //             this.checkUserQuiz(this.employee.id);
  //           }
  //         },
  //         error => {

  //         },
  //         () => {

  //         }
  //       );
  //     }).catch(error => {
  //       return error;
  //     });
  // }

  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

}
