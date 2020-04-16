import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialod',
  templateUrl: './confirmdialod.component.html',
  styleUrls: ['./confirmdialod.component.css']
})
export class ConfirmdialodComponent implements OnInit {
  message: string = "Are you sure?";
  confirmButtonText = "Delete";
  cancelButtonText = "Cancel";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmdialodComponent>) {
       // if(this.data){
    //   this.message = this.data.message || this.message;
    //   if (this.data.buttonText) {
    //     this.confirmButtonText = this.data.buttonText.ok || this.confirmButtonText;
    //     this.cancelButtonText = this.data.buttonText.cancel || this.cancelButtonText;
    //   }
  // }
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }   

  ngOnInit(): void {
    this.dialogRef.close(true);
  }

}
