import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormdatacollectionService } from '../services/formdatacollection.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  route: Router = inject(Router)
  messageService: MessageService = inject(MessageService)
  datacollection: FormdatacollectionService = inject(FormdatacollectionService)
  stateService : StatesService = inject(StatesService)
  dob: Date | null = null;
  minDate = new Date(2004, 4, 1);

  validForm: boolean = true

   username: string = "";
   show: boolean = true;
   firstname: string = "";
   lastname: string = "";
   gender: string = "Male";
   email: string = "";
   phone: string = "";
   address: string = "";
   conformpass: string = "";
   password: string = "";
   admin: boolean = false;
   description: string = "";
   imageUrl: string = "../../assets/profile.png";
   selectedFile: File | null = null;


   currentPage = 1;
   isEditMode = false;
   prevpage() {
    this.show = true;
    this.currentPage = 1;
   }

   nextpage() {
    this.show = false;
    this.currentPage = 2
   }

   canGoToNext() {
    this.nextpage();
  }


   countries = [
      { name: 'India', code: 'IN' },
      { name: 'USA', code: 'US' }
    ];

  states = this.stateService.getStates()


  timeZones = [
    'IST', 'PST', 'EST', 'CST', 'MST', 'GMT', 'UTC'
  ];

  locales = [
    'en-IN', 'en-US', 'fr-FR', 'de-DE'
  ];

  countryCodeList = [
    { label: '+91', value: '+91' },
    { label: '+01', value: '+01' }
  ];
  
  selectedCountryCode: string = '';
  

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

  onChangeImage(event: any) {
    const file = event.target.files[0];
    
    if (!file) {
      this.imageUrl = this.getInitials();
      return;
    }
  
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!types.includes(file.type)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Format',
        detail: 'Only PNG or JPG formats are allowed.'
      });
      return;
    }
  
    if (file.size > 2 * 1024 * 1024) { 
      this.messageService.add({
        severity: 'error',
        summary: 'File Too Large',
        detail: 'Image size must be less than 2MB.'
      });
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  
  getInitials(): string {
    const initials = `${this.firstname.charAt(0)}${this.lastname.charAt(0)}`;
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }  
  
  formatDate(date: any): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  


submitData() {
  if (this.data.invalid || !this.selectedCountryCode || !this.email || !this.username || !this.firstname || !this.phone) {
    this.messageService.add({
      severity: 'error',
      summary: 'Form Invalid',
      detail: 'Please fill all required fields '
    });
    return;
  }

  if (this.password !== this.conformpass) {
    this.messageService.add({
      severity: 'error',
      summary: 'Password Mismatch',
      detail: 'Passwords do not match!'
    });
    return;
  }

  // Run both checks in parallel
  forkJoin({
    emailExists: this.datacollection.isEmailDuplicate(this.email),
    usernameExists: this.datacollection.isDuplicate(this.username)
  }).subscribe({
    next: ({ emailExists, usernameExists }) => {
      if (emailExists) {
        this.messageService.add({
          severity: 'error',
          summary: 'Duplicate Email',
          detail: 'Email already exists!'
        });
        return;
      }

      if (usernameExists) {
        this.messageService.add({
          severity: 'error',
          summary: 'Duplicate Username',
          detail: 'Username already exists!'
        });
        return;
      }

      // Proceed only if both checks pass
      this.saveUserData();
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Validation failed!'
      });
    }
  });
}


  

  saveUserData() {

    if (this.imageUrl === "../../assets/profile.png") {
      this.imageUrl = this.getInitials();
    }
    const formData = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      dob: this.formatDate(this.dob),
      email: this.email,
      phone: `${this.selectedCountryCode}${this.phone}`,
      address: this.address,
      country: this.country,
      state: this.state,
      Zipcode: this.zipCode,
      timeZone: this.timeZone,
      locale: this.locale,
      admin: this.admin,
      password: this.password,
      conformpass: this.conformpass,
      imageUrl: this.imageUrl
    };
    this.datacollection.postData(formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'You have been registered successfully.'
        });
        this.route.navigate(['/login']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registration failed!'
        });
      }
    });
  }

  gotToLogin() {
    this.route.navigate(['/login'])
  }

  handlegendercolor() {
    switch(this.gender) {
      case 'Male':
      case 'Female':
      case 'others':
        return '#141569';
      default:
        return '#f3f3f3';
    }
  }
  

  deleteProfile() {
    this.imageUrl = '../../assets/profile.png'
  }
}

