import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConnectionInterfaceService } from '../connection-interface.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  sessions;
  
  ticketForm : FormGroup = this.fb.group({
    nom:["",Validators.required],
    quantite:["",Validators.required],
    adresse_mail:["",Validators.required],
    date_paiement:["",Validators.required],
    total_prix:["",Validators.required],
  })
  
  loginFormModalEmail = new FormControl('', Validators.email);
  loginFormModalPassword = new FormControl('', Validators.required);

  constructor(private fb:FormBuilder, private connect: ConnectionInterfaceService) { }

  ngOnInit() {
   this.connect.getInterface().subscribe(res=>{
     this.sessions=res ;
     console.log(res)

   })
  }
  onSubmit() {
    console.log(this.ticketForm.value as  JSON)
    this.connect.postAchat(this.ticketForm.value).subscribe(res=>{
      console.log(res)
    })
}
}
