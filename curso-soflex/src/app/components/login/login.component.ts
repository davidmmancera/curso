import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ruta: Router) { }
  
  formLogin: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  submit(){
    debugger;
    if (this.formLogin.valid) {
      this.ruta.navigate(['cliente']);
    }
  }

}
