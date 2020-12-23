import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/domain/login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({});

  constructor(public ruta: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }  
 

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit(){
    debugger;
    const x = this.form.value

    if (x.usuario && x.password) {
      debugger;
      this.authService.login(x.usuario, x.password).subscribe((authRes: any)=>{
        console.log(authRes);
        localStorage.setItem('Authorization', authRes.token);
        this.ruta.navigate(['cliente']);
      });  
    }
  }

}
