import { Component, inject } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';

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
  displayedColumns: string[] = ['name', 'position', 'weight', 'odd', 'symbol', 'action'];
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
