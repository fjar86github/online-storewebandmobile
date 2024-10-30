import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {



  products: any[] = [];
  searchTerm: string = ''; // Holds the search input value

  private authService: AuthenticationService;



  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data; // Store the fetched products
    });
  }
  // Method to filter products based on the search term
  get filteredProducts() {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  constructor(private productService: ProductService, authService: AuthenticationService) {
    this.authService = authService;
  }

  async ngOnInit() {
    // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
    await this.productService.loadApiUrl();
    this.authService.checkAuthentication();
    this.loadProducts();
  }

}
