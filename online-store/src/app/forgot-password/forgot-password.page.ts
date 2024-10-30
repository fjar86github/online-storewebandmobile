import { Component, OnInit } from '@angular/core';

import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string = '';       // User's email input
  password: string = '';    // Property to store the retrieved password

private router:Router;
  constructor(private userService: UserServiceService,router:Router,private alertController:AlertController) { 
    this.router=router;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Information',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  forgotPassword() {
    this.userService.forgotPassword(this.email).subscribe(
      response => {
        console.log('Forgot password request successful:', response);
        
        if (response.status === 'success') {
          // Display a message indicating the password has been reset
          this.presentAlert('Your password has been reset to your username. Please check your email for further instructions.'); 
        } else {
          // Display the error message returned from the server
          this.presentAlert(response.message);
        }
        
        // Optionally navigate to a different page or keep on the same page
        // this.router.navigate(['/login']);
      },
      error => {
        console.log('Forgot password request failed:', error);
        this.presentAlert('An error occurred. Please try again.'); // Alert for general errors
      }
    );
}


 async ngOnInit() {
  // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
  await this.userService.loadApiUrl();
  }

}
