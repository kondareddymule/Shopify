import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';


const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent
  }, {
    path: 'admin/users',
    component: AdminUserComponent
  }, {
    path: 'admin',
    component: AdminComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    AdminComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    AdminHomeComponent,
    AdminProductComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    InputTextModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    HttpClientModule,
    InputSwitchModule,
    ToastModule,
    RippleModule,
    ChartModule,
    FileUploadModule,
    RadioButtonModule,
    MessageModule,
    MessagesModule,
    TabMenuModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
