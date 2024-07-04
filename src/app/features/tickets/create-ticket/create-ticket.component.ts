import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fixture, Ticket } from './ticket-interface'
import { MatTable } from '@angular/material/table';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})

export class CreateTicketComponent {
  @ViewChild(MatTable) table:MatTable<any> | undefined
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toISOString());
  fixture!: Fixture
  fixtures: Fixture[] = [];
  ticket: Ticket = {
    title: "",
    limit: 0,
    closeTime: '',
    closeDate: '',
    fixtures:  [],
    totalOdds: 0,
    status: '',
    win: false,
    users: []
  };
  page2 = false;

  constructor (public ticketServie: TicketService) {}
  displayedColumns: string[] = ['S/N', 'TEAM A', 'TEAM B', 'OPTION', 'ODD', 'ACTION'];
  dataSource = this.fixtures;
  
  // ticketForm = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   closeTime: new FormControl('', [Validators.required]),
  //   maxStake: new FormControl('', [Validators.required])
  // })

  // get title(): any { return this.ticketForm.get('firstName'); }
  // get closeTime(): any { return this.ticketForm.get('lastName'); }
  // get maxStake(): any { return this.ticketForm.get('address'); }

  saveInfo(ticketData:Ticket){
    console.log(new Date(ticketData.closeDate).toDateString());
    console.log(new Date(ticketData.closeDate).toLocaleTimeString());
    console.log(new Date(ticketData.closeDate).toLocaleDateString());
    console.log(new Date(ticketData.closeDate).toTimeString());
    
    if (ticketData) {
      this.ticket.title = ticketData.title;
      this.ticket.closeTime = new Date(ticketData.closeDate).toLocaleTimeString();
      this.ticket.closeDate = new Date(ticketData.closeDate).toDateString();
      this.ticket.limit = ticketData.limit;
      this.page2 = true;
      // console.log(this.ticket);
      // this.forms.ticketForm.reset();
      
    }
    
  }

  saveMatch (match:any) {
    // console.log(match);
    this.fixtures.push(match.value);
    // console.log(this.fixtures);
    this.table?.renderRows()
    match.reset();
  }

  deleteMatch(match:Fixture) {
    for (let index = 0; index < this.fixtures.length; index++) {
      const element = this.fixtures[index];
      if (element == match) {
        this.fixtures.splice(index, 1);
        this.table?.renderRows();
        
        return;
      }
    }
  }

  getTotalOdds() {
    let total:number = this.fixtures.reduce((accum,item) => accum + item.odd, 0);
    // for (let index = 0; index < this.fixtures.length; index++) {
    //   const element = this.fixtures[index];
    //   total += element.odd;
    // }
    return total;
  }

  saveTicket() {
    this.ticket.fixtures = this.fixtures
    console.log(this.ticket);
    this.page2 = false;
    this.ticketServie.save(this.ticket);
  }
}
