
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    contact:string
  }

  export interface EmployeeApiModel {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    contact:string
  }
  
  export class EmployeeModel implements Employee {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    contact:string
  
    constructor(source: EmployeeApiModel) {
      this.id = source.id;
      this.firstName = source.first_name;
      this.lastName = source.last_name;
      this.gender = source.gender;
      this.contact = source.contact
    }
  
    static mapFieldTO(model_field:String) : String
    {
      switch(model_field) {
        case 'firstName':{
          return 'first_name';
        }
        case 'lastName': {
          return 'last_name';
        } 
        default :{
          return model_field;
        }
      }
    }
  }