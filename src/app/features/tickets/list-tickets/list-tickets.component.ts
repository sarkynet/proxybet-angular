import { Component, inject } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { ViewTicketComponent } from '../view-ticket/view-ticket.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  class: string;
  odd: string;
  disabled: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'pending', weight: 1.0079, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 2, name: 'active', weight: 4.0026, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 3, name: 'active', weight: 6.941, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 4, name: 'closed', weight: 9.0122, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 5, name: 'pending', weight: 10.811, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 6, name: 'pending', weight: 12.0107, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 7, name: 'closed', weight: 14.0067, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 8, name: 'active', weight: 15.9994, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 9, name: 'closed', weight: 18.9984, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
  {position: 10, name: 'active', weight: 20.1797, symbol: '25/09/24', odd:'This is the Discription of the Ticket', class:'', disabled: false},
];
// const dialog = inject(MatDialog);

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'odd', 'symbol', 'action', 'bet'];
  dataSource = ELEMENT_DATA;
  
  constructor(
    public dialog: MatDialog
  ) {}
  ngOnInit(){
    this.statusClass()
  }

  statusClass (){
    for (let index = 0; index < ELEMENT_DATA.length; index++) {
      const element = ELEMENT_DATA[index];
      if (element.name == 'active') {
        element.class = "accent-text";
      }else if (element.name == 'pending') {
        element.class = "warn-text";
        element.symbol = 'expired';
        element.disabled = true;
      }else if (element.name == 'closed') {
        element.class = "danger-text";
        element.symbol = 'expired';
        element.disabled = true;
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
