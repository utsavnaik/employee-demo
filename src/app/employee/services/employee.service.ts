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
  getEmployeeById(id: string): Observable<EmployeeModel> {  
    return this.http.get<EmployeeApiModel>(this.url+'/' + id).pipe(
      map((emp:EmployeeApiModel)=> new EmployeeModel(emp))
    );  
  }  

  createEmployee(employee: EmployeeApiModel): Observable<EmployeeModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log('before send',employee);
    return this.http.post<EmployeeApiModel>(this.url,employee, httpOptions).
    pipe(
      map((emp:EmployeeApiModel)=> new EmployeeModel(emp))
    );
  }

  updateEmployee(employee: EmployeeApiModel): Observable<EmployeeModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<EmployeeApiModel>(this.url + '/'+employee.id,  
    employee, httpOptions).pipe(
      map((emp:EmployeeApiModel)=> new EmployeeModel(emp))
    );  
  } 

  deleteEmployeeById(id: String): Observable<any> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete(this.url +'/' +id,  
 httpOptions);  
  }
}
