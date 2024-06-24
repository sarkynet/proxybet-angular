import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  options: FormGroup;

  constructor(fb: FormBuilder, public dialog: MatDialog ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      name: ['', Validators.required]
    });
  }


}