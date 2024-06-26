import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  page: string = "";
  options: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'odd', 'symbol', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(fb: FormBuilder, public dialog: MatDialog, private router: Router ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      name: ['', Validators.required]
    });
    
    
  }

  ngOnInit(){
    // console.log(this.router.url);
    this.page = this.router.url
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

}