import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fixture, Ticket } from './ticket-interface'
import { MatTable } from '@angular/material/table';
import { TicketService } from '../../../services/ticket.service';
import { Router } from '@angular/router';
import { Leagues } from '../../../data/leagues';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})

export class CreateTicketComponent {
  @ViewChild(MatTable) table!:MatTable<any>
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toISOString());
  fixture!: Fixture
  fixtures!: Fixture[];
  ticket!: Ticket
  page2 = false;
  leagues = Leagues;
  Ateams:any = [];
  Bteams:any = [];

  constructor (public ticketService: TicketService, public router: Router) {}
  displayedColumns: string[] = ['S/N', 'TEAM A', 'TEAM B', 'OPTION', 'ODD', 'ACTION'];
  dataSource = this.fixtures;
  route = this.router.url;
  // ticketForm = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   closeTime: new FormControl('', [Validators.required]),
  //   maxStake: new FormControl('', [Validators.required])
  // })

  // get title(): any { return this.ticketForm.get('firstName'); }
  // get closeTime(): any { return this.ticketForm.get('lastName'); }
  // get maxStake(): any { return this.ticketForm.get('address'); }

  saveInfo(ticketData:any){
    // console.log(new Date(ticketData.value.closeDate).toDateString());
    // console.log(new Date(ticketData.value.closeDate).toLocaleTimeString());
    // console.log(new Date(ticketData.value.closeDate).toLocaleDateString());
    // console.log(new Date(ticketData.value.closeDate).toTimeString());
    
    if (ticketData.value) {
      this.ticket = ticketData.value;
      this.ticket.closeTime = new Date(ticketData.value.closeDate).toLocaleTimeString();
      this.ticket.closeDate = new Date(ticketData.value.closeDate).toDateString();
      this.page2 = true;
      ticketData.reset();
      
    } 
  }

  saveMatch (match:any) {
    if (!this.fixtures)
      this.fixtures = [];

    this.fixtures.push(match.value);
    // console.log(this.fixtures);
    this.dataSource = this.fixtures;
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
    let total:number = 0;
    if (this.fixtures){ 
      total = this.fixtures.reduce((accum,item) => accum + item.odd, 0);
    }
    return Math.round(total);
  }

  getLastGameTime() {
    let lastTime = 0;
    for (let index = 0; index < this.fixtures.length; index++) {
      const element = this.fixtures[index];
      if (new Date(element.time).getTime()  > lastTime) 
        lastTime = new Date(element.time).getTime();
    }
    return lastTime;
  }

  setTicketStatus(ticket:any){
    let status: string; 
    let today = new Date().getTime();
    let hour = 3600000;
    let ticketDate = new Date(ticket.closeDate).getTime()
    let lastGame = this.getLastGameTime()
    if (ticketDate - today > hour) {
      status = "Active";
    }
    else if ((ticketDate - today <= hour) && (ticketDate - today > 1)) {
      status = "Pending";
    }
    else if (lastGame < today) {
      status = "Closed";
    }
    else if ((ticketDate - today < 1) && (lastGame < today)) {
      status = "In Progress";
    }
  }

  getTicketResult(){
    let result = true;
    for (let index = 0; index < this.fixtures.length; index++) {
      const element = this.fixtures[index];
      if (!element.result) 
        result = false;
    }
    return result;
  }

  saveTicket() {
    this.ticket.fixtures = this.fixtures;
    this.ticket._id = this.uniqueRef();
    console.log(this.ticket);
    this.page2 = false;
    this.ticketService.save(this.ticket);
    this.router.navigate(['tickets']);
  }

  updateTicket() {
    this.ticket.fixtures = this.fixtures;
    console.log(this.ticket);
    this.page2 = false;
    this.ticketService.update(this.ticket);
  }

  uniqueRef() {
    return Math.random().toString(16).slice(2);
  }

  getTeamsA(league:any){
    for (let index = 0; index < this.leagues.length; index++) {
      const element = this.leagues[index];
      if (element.title == league) {
        this.Ateams = element.teams;
      }
    }
  }
  getTeamsB(league:any){
    for (let index = 0; index < this.leagues.length; index++) {
      const element = this.leagues[index];
      if (element.title == league) {
        this.Bteams = element.teams;
      }
    }
  }

}
