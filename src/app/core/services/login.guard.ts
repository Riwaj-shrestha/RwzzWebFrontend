import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth, private auth: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      if (this.auth.isloggedIn()) {
        console.log('Auth: User logged in');
        this.router.navigate(['/admin/dashboard']).then();
        resolve(false);
      } else {
        console.log('user not logged in');
        resolve(true);
      }
      // this.afAuth.onAuthStateChanged(user => {
      //   if (user) {
      //     resolve(false);
      //   } else {
      //     this.router.navigate(['/admin']).then();
      //     resolve(true);
      //   }
      // }).then();
    });
  }
}
