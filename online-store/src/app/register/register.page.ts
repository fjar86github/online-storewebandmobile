import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private router:Router,private userService:UserServiceService) { }

  register() {
    this.userService.register(this.userData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          // Navigate to the login page on successful registration
          this.router.navigate(['/login']);
        } else {
          console.log('Registration failed:', response.message);
        }
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }


async  ngOnInit() {
  // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
  await this.userService.loadApiUrl();
    this.register();
  }

}
