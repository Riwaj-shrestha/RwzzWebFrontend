import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    if (this.signupForm.invalid) {                            // if there's an error in the form, don't submit it
      console.warn('Form invalid');
      return;
    }
    this.authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null) {                                 // null is success, false means there was an error
        this.router.navigate(['login']).then();
      }
      else if (result.isValid === false) {
        this.firebaseErrorMessage = result.message;
      }
    }).catch((abc) => {
      console.log(abc);
    });
  }


}
