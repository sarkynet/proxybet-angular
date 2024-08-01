import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  localDB:any = document.defaultView
  DB:any = this.localDB?.localStorage
  constructor( ) { }

  save(ticket:any){
    let Tickets:any = [];
    let now = new Date().toLocaleString()
    ticket.created = now;
    if (this.DB.getItem('Tickets')) {
      Tickets = this.DB.getItem('Tickets');
      Tickets = JSON.parse(Tickets);
      Tickets.push(ticket);
      Tickets = JSON.stringify(Tickets);
      this.DB.setItem('Tickets', Tickets)
    }
    else {
      Tickets.push(ticket);
      Tickets = JSON.stringify(Tickets);
      this.DB.setItem('Tickets', Tickets)
    }
    
  }

  update(ticket:any){
    console.log(ticket);
    
  }

  getHistory(){
    let Tickets:any;
    let history = [];
    let now = new Date().getTime()
    if (this.DB.getItem('Tickets')) {
      Tickets = this.DB.getItem('Tickets');
      Tickets = JSON.parse(Tickets);
      for (let index = 0; index < Tickets.length; index++) {
      const element = Tickets[index];
      if ((new Date(element.closeDate).getTime() - now) > 604800000) {
        history.push(element)
      }
      
      }
      return history;
    }
    return [];
  }

  getTickets(){
    let Tickets:any;
    let recents = [];
    let now = new Date().getTime()
    if (this.DB.getItem('Tickets')) {
      Tickets = this.DB.getItem('Tickets');
      Tickets = JSON.parse(Tickets);
      for (let index = 0; index < Tickets.length; index++) {
        const element = Tickets[index];
        if ((new Date(element.closeDate).getTime() - now) < 604800000) {
          recents.push(element)
        }
      }
      return recents;
    }
    return [];
  }
}
