import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn = new BehaviorSubject(false);    // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    // this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
      this.userLoggedIn.next(!!user);
    }).then();
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        // this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) {
          return { isValid: false, message: error.message };
        }
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        const emailLower = user.email.toLowerCase();
        result.user.sendEmailVerification().then();                    // immediately send the user a verification email
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code) {
          return { isValid: false, message: error.message };
        }
      });
  }

}
