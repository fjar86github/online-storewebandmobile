import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credentials = { username: '', password: '' };

  constructor(private productService: ProductService, private router: Router) {
  }

  login() {
    this.productService.login(this.credentials).subscribe(response => {
      if (response && response.message === 'Login successful') {
        // Save authentication token
        localStorage.setItem('authToken', 'your-token'); // Save auth token    
        this.credentials = { username: '', password: '' }; // Reset credentials    
        // Redirect to the home page after successful login
        this.router.navigate(['/home']);
      } else {
        alert('Login failed!');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  gotoForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  async ngOnInit() {
    await this.productService.loadApiUrl();
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }
}
