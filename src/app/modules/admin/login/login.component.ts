import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }


  ngOnInit(): void {
    this.authService.userLoggedIn.subscribe(value => {
      console.log(value);
      if (value) {
        this.router.navigateByUrl('/admin/dashboard').then();
      }
    });
  }
  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {                               // null is success, false means there was an error
        console.log('logging in...');
        this.router.navigate(['/admin/dashboard']).then();                // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid === false) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

}
