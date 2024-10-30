import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-statistic',
  templateUrl: './sales-statistic.page.html',
  styleUrls: ['./sales-statistic.page.scss'],
})
export class SalesStatisticPage implements OnInit {
  sales: any[] = [];
  url: string = ''; // API URL
  errorMessage: string | null = null; // Error message holder

  constructor(
    private productService: ProductService,
    private authenticate: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticate = authenticate;
  }

  async ngOnInit() {
    await this.authenticate.checkAuthentication();
    this.url = (await firstValueFrom(this.productService.loadApiUrl())) + '/sales_statistic.php' || '';
    this.loadStatistic(); // Call to load the sales statistics
  }

  loadStatistic() {
    this.http.get<any>(this.url).subscribe(
      (response) => {
        this.sales = response.data; // Assuming the API returns { data: [...] }
        this.errorMessage = null; // Clear previous error message
      },
      (error) => {
        this.errorMessage = 'Error fetching sales statistics: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }
}
