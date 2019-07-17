import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { TicketComponent } from './ticket/ticket.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'AboutUs', component: AboutUSComponent},
    {path: 'Ticket', component: TicketComponent},
    {path: 'Contact', component: ContactComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
   })
   export class AppRoutingModule { }