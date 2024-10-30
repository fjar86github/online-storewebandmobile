import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router:Router) { }

  checkAuthentication(): void {
    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (isAuthenticated) {
      // Redirect to home if authenticated
      //this.router.navigate(['/home']);
    } else {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
    }
  }

}
