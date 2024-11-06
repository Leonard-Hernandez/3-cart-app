import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'div[product-card]',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: Product;

  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();
  onAddCart(product: Product){
    this.productEventEmitter.emit(product);
  }

}
