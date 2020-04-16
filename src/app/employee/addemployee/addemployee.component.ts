import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { EmployeeApiModel, EmployeeModel } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit , OnDestroy {
  employeeForm: FormGroup;
  subscriptions:Subscription[] = [];
  constructor( private fb: FormBuilder,
    private employeeService:EmployeeService,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id:[''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender:['',Validators.required],
      contact:['',Validators.required]
    });

    this.route.params.subscribe(params => {
      this.employeeService.getEmployeeById(params.id).subscribe(
        data=> {
           this.employeeForm.patchValue(data);
         },
        error=>{
          const snack = this.snackBar.open('Error while fetch employee.','error',{
            duration:1000
          });
        } 
      )
    });

  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  onSubmit(){
    console.log(this.employeeForm.value.id);
    if(this.employeeForm.value.id){
      this.editEmployee();
    } else {
      this.addEmployee();
    }
  }

  editEmployee(){
    this.employeeService.updateEmployee(new EmployeeApiModel(this.employeeForm.value)).subscribe(
      data=> {
        const snack = this.snackBar.open('Update employee successfully.','success',{
          duration:1000
        });
        this.router.navigate(['employee']);
       },
      error=> {
        const snack = this.snackBar.open('Error while Update employee.','error',{
          duration:1000
        });
      }
    ); 
  }

  addEmployee(){
    this.subscriptions.push(this.employeeService.createEmployee(new EmployeeApiModel(this.employeeForm.value)).subscribe(
      data=> {
        const snack = this.snackBar.open('Add employee successfully.','success',{
          duration:1000
        });
        this.router.navigate(['employee']);
       },
      error=> {
        const snack = this.snackBar.open('Error while add employee.','error',{
          duration:1000
        });
      }
    )); 
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=> {
      subscription.unsubscribe();
    })
  }

}
