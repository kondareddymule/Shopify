import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  @ViewChild('formRef') formRef: NgForm;

  http: HttpClient = inject(HttpClient)
  items: any[] =[]
  visible: boolean = false;
  searchText: string = '';
  date = formatDate(new Date(), 'dd/MM/yyyy hh:mm a', 'en-US')


  showDialog() {
      this.visible = true;
      this.formRef.resetForm();
  }

    filteredItems() {
      return this.items.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    
    IsAdmin = JSON.parse(localStorage.getItem('User')).admin

    loadProducts() {
      this.http.get<any[]>('http://localhost:3000/products')
        .subscribe((item) => {
          this.items = item;
        });
    }
    

  ngOnInit() {
   this.loadProducts()
  }

  decreaseQuantity(id: number) {
    const item = this.items.find((item) => item.id === id);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
      this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(
        () => console.log('Quantity updated successfully')
      );
    }
  }

  increaseQuantity(id: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity += 1;
      this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(
        () => console.log('Quantity updated successfully')
      );
    }
  }
  

  showErrors = false;

  imagePreview: string | null = null;
  imageName: string | null = null;

  product = {
    image: null as string | null,
    title: '',
    category: '',
    price: null as number | null
  };

  onFileSelected(event: any) {
    this.accept(event)
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.product.image = this.imagePreview;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  previewImage(file: File) {
    this.imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.product.image = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }

  onCancel() {
    this.resetForm();
    this.visible = false;
  }

  onSave() {
    this.showErrors = true;
  
    const isValid = this.imagePreview &&
                    this.product.title.trim() !== '' &&
                    this.product.category.trim() !== '' &&
                    this.product.price !== null &&
                    this.product.price > 0;
  
    if (!isValid) {
      return;
    }
  
    this.http.post('http://localhost:3000/products', {
      status: 'pending',
      quantity: 0,
      date: this.date,
      ...this.product,
      title: this.product.title.trim(),
      category: this.product.category.trim()
    }).subscribe((product) => {
      this.loadProducts();
      console.log('Saved product:', product);
    });
  
    this.resetForm();
    this.visible = false;
    this.showErrors = false;
  }
  

  removeImage() {
    this.imagePreview = null;
    this.product.image = null;
    this.imageName = null;
  }

  resetForm() {
    this.formRef.resetForm();
    this.product = {
      image: null,
      title: '',
      category: '',
      price: null
    };
    this.imagePreview = null;
    this.showErrors = false;
    this.imageName = null;
  } 

  accept(event: any) {
    console.log(event)
  }
}
