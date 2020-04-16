import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';


const routes: Routes = [{
  path:'',
  component:EmployeelistComponent
},
{
  path:'add',
  component:AddemployeeComponent
},
{
  path:'edit/:id',
  component:AddemployeeComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
