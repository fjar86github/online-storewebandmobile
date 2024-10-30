import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public static apiUrl?: string;
  private apiLoaded$: Observable<string>;

  constructor(private http: HttpClient) {
    this.apiLoaded$ = this.loadApiUrl();
  }

  // Load API URL once and store it in apiLoaded$
  public loadApiUrl(): Observable<string> {
    if (ProductService.apiUrl) {
      return of(ProductService.apiUrl);
    }
    return this.http.get<{ apiUrl: string }>('assets/api_endpoints.json').pipe(
      tap(response => {
        ProductService.apiUrl = response.apiUrl;
        console.log('API URL loaded:', ProductService.apiUrl);
      }),
      switchMap(() => ProductService.apiUrl ? of(ProductService.apiUrl) : throwError(() => new Error('API URL is undefined'))),
      catchError(error => {
        console.error('Error loading API URL:', error);
        return throwError(() => new Error('Failed to load API URL'));
      })
    );
  }

  private getApiUrl(): Observable<string> {
    return this.apiLoaded$;
  }

  getProducts(): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.get(`${apiUrl}/get_products.php`))
    );
  }

  getProduct(id: number): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.get(`${apiUrl}/get_product.php?id=${id}`))
    );
  }

  addProduct(product: any): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.post(`${apiUrl}/add_product.php`, product))
    );
  }

  updateProduct(product: any): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.put(`${apiUrl}/update_product.php`, product))
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.delete(`${apiUrl}/delete_product.php?id=${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }))
    );
  }

  searchProducts(query: string): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.get(`${apiUrl}/get_search.php?query=${query}`))
    );
  }

  /*
  login(credentials: any): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.post(`${apiUrl}/login.php`, credentials))
    );
  }
*/

login(credentials: any): Observable<any> {
  return this.getApiUrl().pipe(
    switchMap(apiUrl => 
      this.http.post<any>(`${apiUrl}/login.php`, credentials).pipe(
        tap(response => {
          if (response.redirectUrl) {
            // Redirect logic can also be handled in the component
            window.location.href = `${apiUrl}/export.php`; // or handle it in a service or component
          }
        }),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(() => new Error('Login failed, please try again.'));
        })
      )
    )
  );
}


  logout(): Observable<any> {
    return this.getApiUrl().pipe(
      switchMap(apiUrl => this.http.post(`${apiUrl}/logout.php`, {})) // Send POST request to logout.php
    );
  }

  
}
