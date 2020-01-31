import { Injectable } from '@angular/core';

import { User } from '../models/user';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(user: User) {
    localStorage.setItem('currentuser', JSON.stringify(user));

  }

  public isLoggedIn() {
    return localStorage.getItem('currentUuer') !== null;

  }

  public logout() {
    localStorage.removeItem('currentuser');
  }
}
