import { Component, OnInit } from '@angular/core';
import { ConnectionInterfaceService } from '../connection-interface.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {
  tickets;

  constructor(private connect: ConnectionInterfaceService) { }

  ngOnInit() {
    this.connect.getAchat().subscribe(res=>{
this.tickets=res;
console.log(res)
    })
  }
deleteAchat(id: number){
  this.connect.deleteAchat(id).subscribe( res=>{
    console.log(res)
    console.log('deleted')
  });
}
}
