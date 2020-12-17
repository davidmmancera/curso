import { Injectable } from '@angular/core';
import { Login } from '../domain/login';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private config: ConfigService) { }

  login(usuario: string, password:string){
    return this.config.post('login', new Login(usuario, password))
  }
}
