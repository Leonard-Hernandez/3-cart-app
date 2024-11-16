import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

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
      const hasItem = this.items.find(item => {
        return item.product.id === product.id
      })
  
      if (hasItem) {
  
        this.items = this.items.map(item => {
          if(item.product.id === product.id){
            return {
              ... item, quantity: item.quantity +1
            }
          }
          return item;
        })
        
      } else{
        this.items = [... this.items, {product: {... product}, quantity: 1}]
      }
      this.calculateTotal()
      this.saveSession();
      this.router.navigate(['/cart'], {
        state : {
          items: this.items,
          total: this.total
        }
      })
    });
  }

  onDeleteCart():void {
    this.sharingDataService.idProductEventEmitter.subscribe( id =>{
      this.items = this.items.filter( item => item.product.id !== id)
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
    });
  }

  calculateTotal(): void{
    this.total = this.items.reduce( (accumulator, item) => accumulator + (item.quantity * item.product.price),0)
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }
}
