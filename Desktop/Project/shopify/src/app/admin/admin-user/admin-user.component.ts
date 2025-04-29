import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormdatacollectionService } from 'src/app/services/formdatacollection.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {

  http: HttpClient = inject(HttpClient)
  route: Router = inject(Router)

  visible: boolean = false
  showDetails: boolean = false
  adduser: boolean = false

  users: any[] = []

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((user) => {
      this.users = user
    })
  }

  calculate(dateOfBirth: any) {
    
    let date = String(dateOfBirth).split('/');
    let day = parseInt(date[0]);
    let month = parseInt(date[1]) - 1; 
    let year = parseInt(date[2]);
    let birthDate = new Date(year, month, day);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  showDialog() {
    this.visible = true
  }
  showEye() {
    this.showDetails = true
  }
  DeleteShow: boolean = false

    showDelete() {
      this.DeleteShow = true
    }

    cancelButton() {
      this.DeleteShow = false
    }

    addUser() {
      this.adduser = true
    }

    cancelUser() {
      this.adduser = false
    }



    //form Data
    messageService: MessageService = inject(MessageService)
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
       imageUrl: string = "https://th.bing.com/th/id/R.9134ba8b2a4b4471485d19cb4c133611?rik=%2fij7O%2fAP8IwM9g&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2f3%2fe%2fd%2f1%2f1370391822177766488business_user-hi.png&ehk=dDrwKgUPtb0YMFtC3jxIm7INIl74y7NZA9%2b57Z9HTJ4%3d&risl=&pid=ImgRaw&r=0";
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
    
      onChangeImage(event: any) {
        const file = event.target.files[0];
        if (file) {
          const types = ['image/png', 'image/jpeg'];
          if (!types.includes(file.type)) {
            this.messageService.add({ severity: 'error', summary: 'Invalid Format', detail: 'Only PNG or JPG allowed' });
            return;
          }
          if (file.size > 2 * 1024 * 1024) {
            this.messageService.add({ severity: 'error', summary: "File too large", detail: "Image less than 2MB allowed" });
            return;
          }
      
          // Convert image to base64
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrl = reader.result as string; // Store base64 encoded image here
          };
          reader.readAsDataURL(file);
        }
      }
      
    
      
      submitData() {
        if (this.data.invalid) {
          this.messageService.add({
            severity: 'error',
            summary: 'Form Invalid',
            detail: 'Please fill all required fields correctly.'
          });
          return;
        }
      
        if (this.password !== this.conformpass) {
          this.messageService.add({
            severity: 'error',
            summary: "Password Mismatched",
            detail: 'Passwords do not match!'
          });
          return;
        }
        
      
        if (this.datacollection.isDuplicate(this.username)) {
          this.messageService.add({
            severity: 'error',
            summary: "Duplicate User",
            detail: "Username already exists!"
          });
          return;
        }
      
        const formData = {
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
              summary: 'success',
              detail: "User added sucessfully"
            })
            this.route.navigate(['/login'])
          }, 
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Form Submittion Error'
            })
          }
        }),
        this.route.navigate(['/login'])
      }

      cancelBtn() {
        this.adduser = false
      }
}
