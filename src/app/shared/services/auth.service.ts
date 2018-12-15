import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.API_URL;

  returnUrl: string;

  /**
   * Creates an instance of AuthService
   * @param api - HTTP service to call the APIS
   * @param store - Store
   * */
  constructor(private api: ApiService, private store: Store<{ auth }>) {
  }

  /**
   * Store the user in localStorage.
   * @param data - data to be stored;
   * @param keyName - name of the key in which data will be stored;
   */
  private static setAuthToken(data: string, keyName: string): void {
    // todo @AngularUniversalSupport
    // localStorage.setItem(keyName, data);
  }

  static getAuthToken() {
    // todo @AngularUniversalSupport
    return 'fake-jwt-token';
    // return localStorage.getItem('token');
  }

  /**
   * Call the Login API and store the user in localStorage.
   * @param email - email of the user;
   * @param password - password of the user;
   * @returns user - User from the response of the API;
   */
  login({ username, password }) {
    const params = { data: { 'username': username, 'password': password } };
    return this.api.post(`${this.API_URL}login`, params)
      .pipe(
        map(user => {
          AuthService.setAuthToken(user.token, 'token');
          return user;
        })
      );
  }
}
