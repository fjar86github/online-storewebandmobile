import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  isLoginModalOpen: boolean = false; // Modal state
  loginError: string | null = null; // Error message
  url: string = ''; // API URL

  constructor(private productService: ProductService, private http: HttpClient) {}
  credentials = { username: '', password: '' };
  async ngOnInit() {
    // Load API URL using firstValueFrom to convert Observable to Promise
    this.url = await firstValueFrom(this.productService.loadApiUrl()) + '/export.php' || '';
  }

  openLoginModal() {
    this.isLoginModalOpen = true; // Open login modal
    this.credentials.username='';
    this.credentials.password='';
  }

  async login(form: any) { // Form argument
    if (form.invalid) {
      this.loginError = 'Please fill in all fields.';
      return;
    }
    
    
      this.productService.login(this.credentials).subscribe(response => {
        if (response && response.message === 'Login successful') {
          // Save authentication token
          localStorage.setItem('authToken', 'your-token'); // Save auth token    
          this.credentials = { username: '', password: '' }; // Reset credentials    
          // Redirect to the home page after successful login
          //this.router.navigate(['/home']);
          this.downloadExportData();
        } else {
          alert('Login failed!');
        }
      });
      
    
    
  }

  async downloadExportData() {
    console.log('API endpoint:', this.url);
    console.log('username:'+this.credentials.username);
    console.log('password:'+this.credentials.password);
    try {
        // Send the credentials in the headers
        const headers = {
            'Authorization': `Basic ${btoa(`${this.credentials.username}:${this.credentials.password}`)}`, // Base64 encode credentials
            'Content-Type': 'application/json'
        };

        const response = await firstValueFrom(
            this.http.get(this.url, { responseType: 'blob', headers })
        );

        if (response) {
            const blob = new Blob([response], { type: 'text/csv' });
            const downloadUrl = URL.createObjectURL(blob);

            // Trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'export_data.csv';
            link.click();

            // Clean up
            URL.revokeObjectURL(downloadUrl);
            this.loginError = null; // Clear error if successful
        } else {
            this.loginError = 'No data available for export.'; // Set error if no data
        }
    } catch (error) {
        console.error('Error exporting data:', error);
        this.loginError = 'An error occurred while exporting data. Please try again.'; // Set error message
    }
  }
}
