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
    let Tickets:any;
    if (this.DB.getItem('Tickets')) {
      Tickets = this.DB.getItem('Tickets');
      Tickets = JSON.parse(Tickets);
      for (let index = 0; index < Tickets.length; index++) {
        const element = Tickets[index];
        if (element._id == ticket._id) {
          Tickets[index] = ticket;
          Tickets = JSON.stringify(Tickets);
          this.DB.setItem('Tickets', Tickets)
        }
      }
    }
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

  approximate (value:number, decimalPlace:number){
    let string, decimal, main, separate, solved;

    string = value + "";
    separate = string.trim().split('.');
    main = separate[0]
    decimal = separate[1].split('')
    if (decimalPlace > decimal.length) 
      decimalPlace = decimal.length
    
    for (let index = decimal.length-1; index >= decimalPlace; index--) {
      const element = Number(decimal[index]);
      if (Number(decimal[0]) > 4 && decimalPlace < 1)
        return Number(main)+1;

      else if (element > 4) {
        decimal.splice(index, 1)
        decimal[index-1] = ''+Number(decimal[index-1]) +1
      }
      else
        decimal.splice(index, 1)
    }

    if (Number(decimal[0]) == 10) 
      return Number(main)+1;
         
    if (!decimal.length) 
      return Number(main);

    solved = Number(main + '.'+decimal.join(''))
    return solved;
  }
}
