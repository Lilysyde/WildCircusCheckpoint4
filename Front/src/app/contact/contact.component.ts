import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../mail.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
contactForm : FormGroup = this.fb.group({
  name:["", Validators.required],
  email:["", Validators.required],
  message:["", Validators.required]
})

  constructor(private fb:FormBuilder,private mail:MailService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.contactForm.value
    //Envoyer un email
    //Route qui envoie un email dans express
    //Service avec methode post qui va taper dans ma route
    //Call api sur la fonction de mon service dans la methode onSubmit()
    // Et qui prend en paramètre this.contactForm.value
    this.mail.sendMail(this.contactForm.value).subscribe(res => {
      console.log(res)
    })
  }
}
