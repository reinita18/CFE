import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  numeroForm = new FormGroup({
    numero : new FormControl("", Validators.required),
  });

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getNumero(form:any){

    if (form.numero==""){
      alert("Llene todos los campos");
    }
    else{
      console.log(form.numero)
      localStorage.setItem("numero",form.numero)
      this.router.navigate(["/report"]);
    }
    
  }

}
