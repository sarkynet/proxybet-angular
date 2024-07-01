import { Component } from '@angular/core';
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
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  displayedColumns: string[] = ['name', 'position', 'weight', 'odd', 'symbol', 'action'];
  dataSource = ELEMENT_DATA;
}
