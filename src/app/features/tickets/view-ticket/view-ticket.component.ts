import { Component, inject, Input } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { TicketService } from '../../../services/ticket.service';
import { Ticket, Fixture } from "../../tickets/create-ticket/ticket-interface";
import { type } from 'node:os';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
  class: string;
  odd: string;
  disabled: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Liverpool FC', name: 'pending', weight: 1.0079, symbol: '25/09/24', odd:'New Castle FC', class:'', disabled: false},
  {position: 'Arsenal FC', name: 'active', weight: 4.0026, symbol: '25/09/24', odd:'Westbrom FC', class:'', disabled: false},
  {position: 'Tottenham', name: 'active', weight: 6.941, symbol: '25/09/24', odd:'Leistercity FC', class:'', disabled: false},
  {position: 'Manchester UTD', name: 'closed', weight: 9.0122, symbol: '25/09/24', odd:'Birmingham FC', class:'', disabled: false},
  {position: 'Barcelona', name: 'pending', weight: 10.811, symbol: '25/09/24', odd:'Valencia', class:'', disabled: false},
  {position: 'Real Madrid FC', name: 'pending', weight: 12.0107, symbol: '25/09/24', odd:'Real Betis FC', class:'', disabled: false},
  {position: 'Man City FC', name: 'closed', weight: 14.0067, symbol: '25/09/24', odd:'Inter Milla Fc', class:'', disabled: false},
  {position: 'Westham UTD', name: 'active', weight: 15.9994, symbol: '25/09/24', odd:'PSG FC', class:'', disabled: false},
  {position: 'Aston VIlla FC', name: 'closed', weight: 18.9984, symbol: '25/09/24', odd:'Dotmond FC', class:'', disabled: false},
  {position: 'Everton FC', name: 'active', weight: 20.1797, symbol: '25/09/24', odd:'Sevilla', class:'', disabled: false},
];

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.scss'
})
export class ViewTicketComponent {
  displayedColumns: string[] = ['teamA', 'teamB', 'option', 'odd', 'status', 'time'];
  ticket!: Ticket;
  tickets!: Ticket[];
  fixtures!: Fixture[];
  dataSource = this.fixtures;
  @Input('_id') ticketId = '';
new: any;

  constructor(
    public dialog: MatDialog, public ticketService: TicketService 
  ) {}

  ngOnInit(){
    if (this.ticketId) {
      this.tickets = this.ticketService.getTickets()
      for (let index = 0; index < this.tickets.length; index++) {
        const element = this.tickets[index];
        if (element._id == this.ticketId) {
          this.ticket = element
          this.fixtures = element.fixtures
          this.setGameStatus(this.fixtures)
          this.dataSource = this.fixtures;
          console.log(this.fixtures);
        }
      }
    }
  }

  getTotalOdds() {
    let total:number = 0;
    if (this.fixtures){ 
      total = this.fixtures.reduce((accum,item) => accum + item.odd, 0);
    }
    return Math.round(total);
  }

  setGameStatus(fixtures:any){
    let today = new Date().getTime();
    let hour = 3600000;
    for (let index = 0; index < fixtures.length; index++) {
      const element = fixtures[index];
      const time = new Date(element.time).getTime()
      element.date = new Date(element.time).toDateString()
      element.matchTime = new Date(element.time).toLocaleTimeString()
      if (time - today > hour) {
        element.status = "Waiting";
      }
      else if ((time - today <= hour) && (time - today > 1)) {
        element.status = "Active";
      }
      else if (time - today < 1) {
        element.status = "Closed";
      }
      else {
        element.status = "Pending"
      }
    }
  }

  openViewDialog(easein:string, easeout:string): void {
    const dialogRef = this.dialog.open(ViewTicketComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }
}
