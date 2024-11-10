import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items: CartItem[] = [];

  @Output() openCartEventEmmiter = new EventEmitter();

  openCart(): void{
    this.openCartEventEmmiter.emit();
  }

}
