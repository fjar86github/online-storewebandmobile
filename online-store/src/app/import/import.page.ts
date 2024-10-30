import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductService } from '../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  url: string = ''; // API URL
  message: string = '';

  constructor(private productService:ProductService, private http:HttpClient) {}

 importData(file: File) {
    const formData = new FormData();
    formData.append('csv_file', file);

    this.http.post(`${this.url}/import.php`, formData)
      .subscribe(response => {
        this.message = 'Data imported successfully!';
      }, error => {
        this.message = 'Error importing data: ' + error.message;
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.importData(file);
    }
  }
  
  async ngOnInit() {
    // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
    this.url = await firstValueFrom(this.productService.loadApiUrl());
  }
}
