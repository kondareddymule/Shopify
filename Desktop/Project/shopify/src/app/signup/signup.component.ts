import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormdatacollectionService } from '../services/formdatacollection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  route: Router = inject(Router)

  datacollection: FormdatacollectionService = inject(FormdatacollectionService)

   username: string = "";
   show: boolean = true;
   firstname: string = "";
   lastname: string = "";
   gender: string = "";
   dob: string = "";
   email: string = "";
   phone: string = "";
   address: string = "";
   conformpass: string = "";
   password: string = "";
   admin: boolean = false;
   description: string = "";
   imageUrl: string = "../../assets/Frame.png";


   prevpage() {
    this.show = true;
   }

   nextpage() {
    this.show = false;
   }


   countries = [
      { name: 'India', code: 'IN' },
      { name: 'USA', code: 'US' }
    ];

  states = {
    IN: [
      { name: 'Maharashtra', code: 'MH' },
      { name: 'Karnataka', code: 'KA' },
      {name: 'Andhra Pradesh', code: 'AP'},
      {name: 'TamilNadu', code: 'TN'},
    ],
    US: [
      { name: 'California', code: 'CA' },
      { name: 'Texas', code: 'TX' }
    ]
  };

  timeZones = [
    'IST', 'PST', 'EST', 'CST', 'MST', 'GMT', 'UTC'
  ];

  locales = [
    'en-IN', 'en-US', 'fr-FR', 'de-DE'
  ];

  country: any = '';
  filteredStates: any[] = [];
  state: any = '';
  zipCode: string = '';
  timeZone: string = "";
  locale: string = "";

  onCountryChange(country: any) {
    this.filteredStates = this.states[country.code] || [];
    this.state = null;
  }

  @ViewChild('formData') data: NgForm

  
  submitData() {
    let userData = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      dob: this.dob,
      email: this.email,
      phone: this.phone,
      address: this.address,
      country: this.country,
      state: this.state,
      zipCode: this.zipCode,
      timeZone: this.timeZone,
      locale: this.locale,
      admin: this.admin,
      password: this.password,
      conformpass: this.conformpass,
      imageUrl: this.imageUrl
    }

    this.datacollection.postData(userData)
    this.route.navigate(['/login'])
  }
}
