import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'landing-page',
    templateUrl: './landingPage.component.html',
    styleUrls: ['./landingPage.component.scss']
})
export class LandingPageComponent {
    locationForm: FormGroup;

    constructor(private router: Router, private builder: FormBuilder) {
        this.constructForm();
    }

    constructForm() {
        this.locationForm = this.builder.group({
            locationRadio: new FormControl('', Validators.required)
        })
    }

    submitLocationForm() {
        let isVictoria = this.locationForm.get('locationRadio').value;
        if(isVictoria) {
            this.router.navigate(['/home']);
        } else {
            alert("Navigate Out")
        }
    }

    get locationRadio() { return this.locationForm.get('locationRadio'); }
}