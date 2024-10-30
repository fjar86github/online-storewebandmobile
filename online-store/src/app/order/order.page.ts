import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

interface OrderResponse {
  message?: string; // Optional message property from the server response
}

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {


  products: Product[] = [];
  quantities: { [key: number]: number } = {};
  message: string = '';

  //products: any[] = [];

  constructor(private http: HttpClient, private productService: ProductService, private authService: AuthenticationService) {
    this.authService = authService;
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  placeOrder(productId: number) {
    const quantity = this.quantities[productId]; // Get the quantity entered by the user

    if (quantity && quantity > 0) { // Check if quantity is valid
      const orderData = {
        productId: productId,
        quantity: quantity
      };

      this.http.post<OrderResponse>('http://localhost/online_store/api/order.php', orderData)
        .subscribe(
          response => {
            this.message = response.message || 'Order placed successfully!'; // Display success message
            this.quantities[productId] = 0; // Reset quantity input after successful order
            this.loadProducts();
          },
          error => {
            console.error('Error placing order', error);
            this.message = 'Error placing order. Please try again later.'; // Handle any errors during order placement
          }
        );
    } else {
      this.message = 'Please enter a valid quantity.'; // Prompt user to enter valid quantity
    }
  }


  async ngOnInit() {
    // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
    await this.productService.loadApiUrl();
    this.authService.checkAuthentication();
    this.loadProducts();
  }

}
