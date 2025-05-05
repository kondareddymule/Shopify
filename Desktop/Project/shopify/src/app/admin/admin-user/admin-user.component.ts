import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormdatacollectionService } from 'src/app/services/formdatacollection.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { StatesService } from 'src/app/services/states.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {

  http: HttpClient = inject(HttpClient)
  route: Router = inject(Router)
  stateService: StatesService = inject(StatesService)

  loggedUser = JSON.parse(localStorage.getItem("User"))

  visible: boolean = false
  showDetails: boolean = false
  adduser: boolean = false
  selectedProfile: string | null = null;
  selectedUser : any | null = null
  dob: Date | undefined;

  users: any[] = []

  ngOnInit() {
    forkJoin([
      this.http.get<any[]>('http://localhost:3000/users'),
      this.http.get<any[]>('http://localhost:3000/orders')
    ]).subscribe(([users, orders]) => {
      this.users = users.map(user => {
        const userOrders = orders.filter(order => order.username === user.username);
        const totalProducts = userOrders.reduce((count, order) => count + (order.orderedItems?.length || 0), 0);
        return { ...user, totalProducts };
      });
    });
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
    if (age < 0) {
      return 0
    } else {
      return age
    };
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  
  
  showDialog(user: any) {
    this.isEditMode = true;
    this.adduser = true;
    this.id = user.id;
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.gender = user.gender;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.country = user.country;
    this.state = user.state;
    this.zipCode = user.Zipcode;
    this.timeZone = user.timeZone;
    this.locale = user.locale;
    this.admin = user.admin;
    this.imageUrl = user.imageUrl;
    this.filteredStates = this.states[this.country.code] || [];
  }
  
  DeleteShow: boolean = false
  showDelete(user: any) {
    this.selectedUser = user;
    this.DeleteShow = true;
  }
  

    cancelButton() {
      this.DeleteShow = false
    }

    addUser() {
      this.isEditMode = false;
      this.username = '';
      this.firstname = '';
      this.lastname = '';
      this.gender = 'Male';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.country = '';
      this.state = '';
      this.zipCode = '';
      this.timeZone = '';
      this.locale = '';
      this.admin = false;
      this.imageUrl = '../../assets/profile.png';
      this.password = '';
      this.conformpass = '';
      this.filteredStates = [];
      this.adduser = true;
    }


    confirmDelete(user: any) {
      
      this.http.get<any[]>(`http://localhost:3000/orders?username=${user.username}`).subscribe({
        next: (orders) => {
          
          const deleteOrderRequests = orders.map(order =>
            this.http.delete(`http://localhost:3000/orders/${order.id}`)
          );
          
          const deleteUserRequest = this.http.delete(`http://localhost:3000/users/${user.id}`);

          
          forkJoin([...deleteOrderRequests, deleteUserRequest]).subscribe({
            next: () => {
              this.users = this.users.filter(u => u.username !== user.username);

              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: 'User and all their orders deleted successfully'
              });

              this.DeleteShow = false;
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete user and/or orders'
              });
            }
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch user orders'
          });
        }
      });
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
       id: string;
       
     
      isEditMode = false;
       
    
    
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

      countryCode = ['+91', '+01']
    
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
            summary: 'Password Mismatched',
            detail: 'Passwords do not match!'
          });
          return;
        }
      
        const formData = {
          id: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          gender: this.gender,
          dob: this.formatDate(this.dob),
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
      
        // EDIT MODE
        if (this.isEditMode) {
          const index = this.users.findIndex(u => u.id === this.id);
          if (index !== -1) {
            this.users[index] = {
              ...this.users[index],
              firstname: this.firstname,
              lastname: this.lastname,
              gender: this.gender,
              dob: this.formatDate(this.dob),
              email: this.email,
              phone: this.phone,
              address: this.address,
              country: this.country,
              state: this.state,
              Zipcode: this.zipCode,
              timeZone: this.timeZone,
              locale: this.locale,
              imageUrl: this.imageUrl
            };
      
            this.http.put(`http://localhost:3000/users/${this.id}`, formData).subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Updated',
                  detail: 'User updated successfully!'
                });
                this.adduser = false;
                this.isEditMode = false;
              },
              error: () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update user.'
                });
              }
            });
          }
          return;
        }
      
        // ADD MODE

        this.datacollection.postData(formData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User added successfully'
            });
            this.adduser = false;
            this.route.navigate(['/login']);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Form submission failed'
            });
          }
        });
      }
      
      cancelBtn() {
        this.adduser = false
      }


    currentPageNo: number = 1;
    pageSize: number = 10;

    get paginatedOrders() {
      const startIndex = (this.currentPageNo - 1) * this.pageSize;
      return this.users.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    }


    handlegendercolor() {
      switch(this.gender) {
        case 'Male':
          return '#141569';
        case 'Female':
          return '#141569';
        case 'other':
          return '#141569';
        default:
          return '#f3f3f3'
      }
    }

    deleteProfile() {
      this.imageUrl = '../../assets/profile.png'
    }
}
