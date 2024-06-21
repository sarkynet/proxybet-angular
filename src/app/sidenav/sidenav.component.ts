import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { navItems } from "./sidenav-menu-items";
import { MatSidenav } from '@angular/material/sidenav';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  opened: boolean = false;
  navItems = navItems;
  isMobileScreen = false;
  isDesktopScreen = true;
  isExpanded = true;
  isShowing = false;
  isDark: boolean = false;

  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngOnInit() {
  this.isDark = false;
  }
 
  toggleTheme() {
  this.isDark = !this.isDark;
  }
  

  constructor(private breakpointObserver: BreakpointObserver) {

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        this.isDesktopScreen = state.breakpoints[MONITOR_VIEW];
      });
  }

  checkMobible() {
    if(this.isMobileScreen){
      this.sidenav.toggle();
    }
    else{
      if (!this.isExpanded) {
        this.isExpanded = true;
        this.isShowing = true;
      }
      else{
        this.isExpanded = false;
        this.isShowing = false
      }
    }
    
  }
  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
