import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [EmployeelistComponent, AddemployeeComponent, EditemployeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  exports: [EmployeelistComponent, AddemployeeComponent, EditemployeeComponent]
})
export class EmployeeModule { }
