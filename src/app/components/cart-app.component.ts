import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private router: Router,
    private service:ProductService, 
    private sharingDataService: SharingDataService){}

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }


  onAddCart():void {
    this.sharingDataService.productEventEmitter.subscribe(product =>{
      
      this.calculateTotal()
      this.saveSession();
      this.router.navigate(['/cart'], {
        state : {
          items: this.items,
          total: this.total
        }
      })
    Swal.fire({
      title: "Shopping Cart",
      text: "Nuevo producto agregado",
      icon: "success"
    });
    });
  }

  onDeleteCart():void {
    this.sharingDataService.idProductEventEmitter.subscribe( id =>{

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.items.length == 0){
            sessionStorage.removeItem('cart')
          }
          this.calculateTotal();
          this.saveSession();
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    
            this.router.navigate(['/cart'], {
              state : {
                items: this.items,
                total: this.total
              }
            })
          })

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

     
    });
  }

  calculateTotal(): void{
    this.total = this.items.reduce( (accumulator, item) => accumulator + (item.quantity * item.product.price),0)
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }
}
