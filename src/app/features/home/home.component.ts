import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formGroup: FormGroup;
  post: any = '';
  dynamictype: string = "number";

  constructor(private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'defaultdyn': [null, Validators.required],
      'defaulttemp': [null, Validators.required],
      'defaultadditional': [null, Validators.required],
    });
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'defaultdyn': [null, Validators.required],
      'defaulttemp': [null, Validators.required],
      'defaultadditional': [null, Validators.required],
    });
  }

  onSubmit(post:any) {
    this.post = post;
  }

}
