import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmployeeApiModel, Employee, EmployeeModel } from '../models/employee.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:3000/employees';

  constructor(private http:HttpClient) { }

  getAllEmployee(field='id', sortOrder = 'asc',page=0,limit=10,filter = ''): Observable<EmployeeModel[]> {
    let sort_field = EmployeeModel.mapFieldTO(field);
    let params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', limit.toString())
    .set('_sort',sort_field.toString())
    .set('_order',sortOrder)
    .set('q',filter);

    return this.http.get<EmployeeApiModel[]>(this.url,{"params":params}).pipe(
       map(
         (data:EmployeeApiModel[])=> data.map(
           (empobj:EmployeeApiModel)=> new EmployeeModel(empobj)
           )
    )); 
  }  
  getEmployeeById(EmployeeApiModelId: string): Observable<EmployeeApiModel> {  
    return this.http.get<EmployeeApiModel>(this.url+'/' + EmployeeApiModelId);  
  }  

  createEmployee(EmployeeApiModel: EmployeeApiModel): Observable<EmployeeApiModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<EmployeeApiModel>(this.url + '/InsertEmployeeApiModelDetails/',  
    EmployeeApiModel, httpOptions);  
  }  
  updateEmployee(EmployeeApiModel: EmployeeApiModel): Observable<EmployeeApiModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<EmployeeApiModel>(this.url + '/UpdateEmployeeApiModelDetails/',  
    EmployeeApiModel, httpOptions);  
  }  
  deleteEmployeeById(EmployeeApiModelid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeApiModelDetails?id=' +EmployeeApiModelid,  
 httpOptions);  
  }
}
