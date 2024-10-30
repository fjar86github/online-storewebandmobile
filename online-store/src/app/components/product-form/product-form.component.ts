import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productData = {
    id: null,
    name: '',
    price: '',
    description: '',
    stock: '',  // Tambahkan properti stock
    image: ''   // Tambahkan properti image
  };
  isEditing = false;

  private authService: AuthenticationService;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    authService: AuthenticationService
  ) {
    this.authService = authService;
  }

  async ngOnInit() {
    // Pastikan `apiUrl` sudah dimuat sebelum melakukan operasi apa pun
    await this.productService.loadApiUrl();
    this.authService.checkAuthentication();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadProduct(id);
    }
  }

  loadProduct(id: string) {
    this.productService.getProduct(+id).subscribe(data => {
      this.productData = data; // Pastikan data produk memiliki struktur yang benar
    });
  }

  saveProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.productData).subscribe(() => {
        this.router.navigate(['/product-list']);

      });
    } else {
      this.productService.addProduct(this.productData).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    }
  }
}
