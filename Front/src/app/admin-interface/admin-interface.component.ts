import { Component, OnInit } from '@angular/core';
import { ConnectionInterfaceService } from '../connection-interface.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {
  sessions;

sessionForm: FormGroup = this.fb.group({
  lieu :["", Validators.required],
  prix :[ "", Validators.required],
  assets :["", Validators.required],
  date :["", Validators.required]
  
})

  constructor(private fb :FormBuilder ,private connect: ConnectionInterfaceService) { }

  ngOnInit() {
    this.connect.getInterface().subscribe(res=>{
      this.sessions=res ;
      console.log(res)
    })
  }
  onSubmit(){
    this.connect.postInterface(this.sessionForm.value).subscribe(res => {
      console.log(res)
    })
  }
  deleteSession(id: number) {
    this.connect.deleteSession(id).subscribe( res => {
      console.log(res)
      console.log('deleted')
    });
   
  }
}
