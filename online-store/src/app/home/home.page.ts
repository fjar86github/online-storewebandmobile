import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

import { ProductService } from '../services/product.service';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  private authService:AuthenticationService;
  constructor(private productService:ProductService, private router: Router,authService:AuthenticationService) {
    this.authService=authService;
   }

 async logout() {
    this.productService.logout().subscribe(response => {
      console.log(response.message); // Handle the response from logout.php
      // Optionally, clear local storage or navigate to the login page
      localStorage.removeItem('authToken'); // Example: Remove auth token
      // Navigate to login page or refresh the current page
      this.router.navigate(['/login']); // Arahkan kembali ke login
    }, error => {
      console.error('Logout failed', error); // Handle any errors
    });
    
  }
  
 ngOnInit() {
    // Check authentication status on initialization
    this.authService.checkAuthentication(); 
  }
}
