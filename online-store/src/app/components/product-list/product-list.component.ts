import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
 

  products: any[] = [];

    private authService: AuthenticationService;
  constructor(private router: Router, private productService: ProductService, authService: AuthenticationService) {
    this.authService = authService;
    this.loadProducts();
  }

  async ngOnInit() {
    // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
    await this.productService.loadApiUrl();
    await this.authService.checkAuthentication();
    this.loadProducts();
    // Subscribe to router events to reload products when the route changes to this component
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/product-list')) { // Adjust the URL path as needed
          this.loadProducts();
        }
      });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
