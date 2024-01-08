import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
  });


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getData(form:any){

    

    if (form.user=="" || form.password==""){
      alert("Llene todos los campos");
    }
    else if (form.user!="admin"){
      alert("Usuario no existe");
    }
    else if (form.password!="admin"){
      alert("Contraseña incorrecta");
    }
    else{
      console.log(form.user)
      console.log(form.password)
      this.router.navigate(["/reports"]);
    }
    
  }

}
