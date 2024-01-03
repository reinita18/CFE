import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Report } from '../models/Report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http : HttpClient) { }

  API_URL = "https://ms-servicio-hoja.onrender.com"

  getReports() {
    return  this.http.get("https://ms-servicio-hoja.onrender.com/hoja_servicio/all");
  }

  getReport(id:string){
    return this.http.get(`${this.API_URL}/hoja_servicio?noOrden=${id}`)
  }

}
