import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Observable, merge, fromEvent, Subscription } from 'rxjs';
import { Employee, EmployeeApiModel, EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmdialodComponent } from 'src/app/shared/confirmdialod/confirmdialod.component';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements AfterViewInit, OnInit,OnDestroy {
  field = 'id';
  dataSource:any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'contact','action'];
  allEmployees: Observable<EmployeeModel[]>;  
  subscriptions: Subscription[] = []
  @ViewChild('input',{static:true}) input: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  
  
  constructor(private employeeService:EmployeeService,
    private router:Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
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
    this.subscriptions.push(this.sort.sortChange.subscribe((ele) => {
      this.paginator.pageIndex = 0;
      this.field = ele.active;
      this.loadAllEmployees();
     }));
  }


  pageChange() {
    this.subscriptions.push(this.paginator.page
    .pipe(
        delay(0),
        tap(() => this.loadAllEmployees())
    )
    .subscribe(
      (data)=>{ console.log(data) },
      (error)=>{ console.log(error.error)}
    ));
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  performSearch() {
    this.subscriptions.push(fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadAllEmployees();
                })
            )
            .subscribe());
  }

   loadAllEmployees() {  
    this.subscriptions.push(this.employeeService.getAllEmployee(this.field,this.sort.direction,this.paginator.pageIndex, this.paginator.pageSize,this.input.nativeElement.value).subscribe((data)=>{
      this.dataSource = new MatTableDataSource<EmployeeModel>(data);
    }));
  }

  delete(item:EmployeeModel){
    this.subscriptions.push(this.employeeService.deleteEmployeeById(item.id.toString()).subscribe(
          (data)=>{
            const index = this.dataSource.data.indexOf(item);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
            const snack = this.snackBar.open('Delete employee successfully.','success',{
              duration:1000
            });
          },
          (error)=>{
            const snack = this.snackBar.open('error while delete employee','error',{
              duration:200
            });
          }
        ));
    
  }

  deleteWithDialog(item:EmployeeModel) {
    const dialogRef = this.dialog.open(ConfirmdialodComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe(
      (confirmed)=>{ 
        if (confirmed) {     
          this.subscriptions.push(this.employeeService.deleteEmployeeById(item.id.toString()).subscribe(
            (data)=>{
              const index = this.dataSource.data.indexOf(item);
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
              const snack = this.snackBar.open('Snack bar open before dialog','success',{
                duration:200
              });
            },
            (error)=>{
              const snack = this.snackBar.open('error while delete employee','error',{
                duration:200
              });
            }
          ));
        }
      });
   }

  ngOnDestroy(): void {
     this.subscriptions.forEach((subscription)=> subscription.unsubscribe());
  }

}
