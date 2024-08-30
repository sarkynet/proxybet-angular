import { Component, Input, ViewChild } from '@angular/core';
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
  tickets!: Ticket[];
  page2 = false;
  leagues = Leagues;
  Ateams:any = [];
  Bteams:any = [];
  result:any

  constructor (public ticketService: TicketService, public router: Router) {}
  displayedColumns: string[] = ['S/N', 'TEAM A', 'TEAM B', 'OPTION', 'ODD', 'ACTION'];
  dataSource = this.fixtures;
  route = this.router.url;
  @Input('_id') ticketId = '';
  // ticketForm = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   closeTime: new FormControl('', [Validators.required]),
  //   maxStake: new FormControl('', [Validators.required])
  // })

  // get title(): any { return this.ticketForm.get('firstName'); }
  // get closeTime(): any { return this.ticketForm.get('lastName'); }
  // get maxStake(): any { return this.ticketForm.get('address'); }

  ngOnInit(){
    if (this.ticketId) {
      this.tickets = this.ticketService.getTickets()
      for (let index = 0; index < this.tickets.length; index++) {
        const element = this.tickets[index];
        if (element._id == this.ticketId) {
          this.ticket = element
          this.ticket.closeDate = new Date(this.ticket.closeDate)
          this.fixtures = element.fixtures
          this.dataSource = this.fixtures;
          console.log(this.ticket);
        }
      }
    }
    this.setTicketStatus(this.ticket)
    this.getTicketResult()
  }

  saveInfo(ticketData:any){
    // console.log(new Date(ticketData.value.closeDate).toDateString());
    // console.log(new Date(ticketData.value.closeDate).toLocaleTimeString());
    // console.log(new Date(ticketData.value.closeDate).toLocaleDateString());
    // console.log(new Date(ticketData.value.closeDate).toTimeString());
    
    if (ticketData.value) {
      this.ticket.title = ticketData.value.title;
      this.ticket.status = ticketData.value.status;
      this.ticket.limit = ticketData.value.limit;
      this.ticket.closeTime = new Date(ticketData.value.closeDate).toLocaleTimeString();
      this.ticket.closeDate = new Date(ticketData.value.closeDate).toDateString();
      this.page2 = true;
      ticketData.reset();
      
    } 
  }

  getStatus(){console.log(this.ticket.status);
  }

  updateInfo(){
    this.ticket.fixtures = this.fixtures;
    this.ticketService.update(this.ticket);
    this.router.navigateByUrl('/tickets') 
  }

  saveMatch (match:any) {
    if (!this.fixtures)
      this.fixtures = [];

    this.fixtures.push(match.value);
    // console.log(this.fixtures);
    this.dataSource = this.fixtures;
     match.reset();
  }

  updateResult(game:any){
    for (let index = 0; index < this.fixtures.length; index++) {
      const element = this.fixtures[index];
      if (element == game) {
        this.fixtures[index].result = !this.fixtures[index].result;
        break;
      }
    }
    
  }

  updateMatch (element:any) {
    
    console.log(this.fixtures);
    console.log(element);
    // this.dataSource = this.fixtures;
    //  match.reset();
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
      // total = this.fixtures.reduce((accum,item) => accum + item.odd, 0);
      for (let index = 0; index < this.fixtures.length; index++) {
        total *= this.fixtures[index].odd
      }
    return this.ticketService.approximate(total, 2) ;
    }
    return total;
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
      this.ticket.status = "Active";
    }
    else if ((ticketDate - today <= hour) && (ticketDate - today > 1)) {
      this.ticket.status = "Pending";
    }
    else if (lastGame < today) {
      this.ticket.status = "Closed";
    }
    else if ((ticketDate - today < 1) && (lastGame < today)) {
      this.ticket.status = "In Progress";
    }
  }

  getTicketResult(){
    let result:boolean = false;
    for (let index = 0; index < this.fixtures.length; index++) {
      const element = this.fixtures[index];
      if (!element.result)
        element.result = false;

    }
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
    this.router.navigate(['tickets']);
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
