import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  typeOfServiceForm: FormGroup;

  constructor(private router:Router, private builder: FormBuilder) {
    this.constructForm();
   }

  constructForm() {
    this.typeOfServiceForm = this.builder.group({
      serviceRadio: new FormControl('', Validators.required)
    })
  }

  submitServiceTypeForm() {
    let typeOfService = this.typeOfServiceForm.get('serviceRadio').value;
    if(typeOfService === "returningUser") {
      this.router.navigate(['order', typeOfService, 'login']);
    } else {
      this.router.navigate(['order', typeOfService]);
    }
  }

  get serviceRadio() { return this.typeOfServiceForm.get('serviceRadio'); }

}
