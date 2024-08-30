import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ViewTicketComponent } from '../view-ticket/view-ticket.component';
import { TicketService } from '../../../services/ticket.service';
import { Fixture, Ticket } from '../create-ticket/ticket-interface';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   class: string;
//   odd: string;
//   disabled: boolean;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'pending', weight: 1.0079, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 2, name: 'active', weight: 4.0026, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 3, name: 'active', weight: 6.941, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 4, name: 'closed', weight: 9.0122, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 5, name: 'pending', weight: 10.811, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 6, name: 'pending', weight: 12.0107, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 7, name: 'closed', weight: 14.0067, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 8, name: 'active', weight: 15.9994, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 9, name: 'closed', weight: 18.9984, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
//   {position: 10, name: 'active', weight: 20.1797, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
// ];
// const dialog = inject(MatDialog);

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent {
  @ViewChild(MatTable) table!:MatTable<any>
  displayedColumns: string[] = ['position', 'name', 'weight', 'odd', 'symbol', 'action', 'bet'];
  tickets!: Ticket[];
  dataSource = this.tickets;
  fixtures!: Fixture[]; 
  
  constructor(
    public dialog: MatDialog,
    public ticketService: TicketService 
  ) {}
  ngOnInit(){
    this.tickets = this.ticketService.getTickets();
    this.dataSource = this.tickets
    
    this.statusClass()
  }

  getTotalOdds(element:Fixture[]) {
    let total:number = 1;
    // total = element.reduce((accum,item)=> accum * item.odd, 0)
    for (let index = 0; index < element.length; index++) {
        total *= element[index].odd
      }
    return this.ticketService.approximate(total, 2) ; 
  }

  statusClass (){
    for (let index = 0; index < this.tickets.length; index++) {
      const element = this.tickets[index];
      if (element.status == 'Active') {
        element.class = "accent-text";
      }else if (element.status == 'Pending') {
        element.class = "warn-text";
        // element.symbol = 'expired';
        element.disabled = true;
      }else if (element.status == 'Closed') {
        element.class = "danger-text";
        // element.symbol = 'expired';
        element.disabled = true;
      }
      else if (element.status == 'In Progress') {
        element.class = "primary-text";
        element.disabled = true;
      }
    }
  }
  
}
