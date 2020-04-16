import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, merge, fromEvent } from 'rxjs';
import { Employee, EmployeeApiModel, EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements AfterViewInit, OnInit {
  field = 'id';
  dataSource:any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'contact'];
  allEmployees: Observable<EmployeeModel[]>;  
  
  @ViewChild('input',{static:true}) input: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  
  
  constructor(private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.loadAllEmployees();  
  }

  ngAfterViewInit(): void {
    this.performSearch();
    this.pageChange();
    this.performSort();
  }

  performSort() {
    this.sort.direction = 'asc';
    this.sort.sortChange.subscribe((ele) => {
      this.paginator.pageIndex = 0;
      this.field = ele.active;
      this.loadAllEmployees();
     });
  }

  pageChange() {
    this.paginator.page
    .pipe(
        tap(() => this.loadAllEmployees())
    )
    .subscribe();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  performSearch() {
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadAllEmployees();
                })
            )
            .subscribe();
  }

   loadAllEmployees() {  
    this.employeeService.getAllEmployee(this.field,this.sort.direction,this.paginator.pageIndex, this.paginator.pageSize,this.input.nativeElement.value).subscribe((data)=>{
      this.dataSource = new MatTableDataSource<EmployeeModel>(data);
    });
  } 

}
