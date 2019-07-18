import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConnectionInterfaceService } from '../connection-interface.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  sessions;
  
  loginFormModalEmail = new FormControl('', Validators.email);
  loginFormModalPassword = new FormControl('', Validators.required);

  constructor(private connect: ConnectionInterfaceService) { }

  ngOnInit() {
   this.connect.getInterface().subscribe(res=>{
     this.sessions=res ;
     console.log(res)

   })
  }

}
