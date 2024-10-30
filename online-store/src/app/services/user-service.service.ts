import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public static apiUrl?: string; // Menandai sebagai mungkin undefined dan menjadikannya static

  constructor(private http: HttpClient) {
    this.loadApiUrl();
  }

  // Mengubah loadApiUrl menjadi async untuk memastikan nilai apiUrl terisi sebelum digunakan
  public async loadApiUrl(): Promise<void> {
    try {
      const data = await lastValueFrom(
        this.http.get<{ apiUrl: string }>('assets/api_endpoints.json').pipe(
          tap(response => {
            UserServiceService.apiUrl = response.apiUrl;
            console.log('API URL loaded:', UserServiceService.apiUrl);
          })
        )
      );
    } catch (error) {
      console.error('Error loading API URL:', error);
    }
  }


  // Register method
  register(userData: { username: string; password: string; email: string }): Observable<any> {
    
    return this.http.post(`${UserServiceService.apiUrl}/register.php`, userData);
  }

  // Forgot Password method
  forgotPassword(email: string): Observable<any> {
    
    return this.http.post<any>(`${UserServiceService.apiUrl}/forgot_password.php`, { email });
    //return this.http.post(`${this.apiUrl}/forgot_password.php`, { email });
  }

}
