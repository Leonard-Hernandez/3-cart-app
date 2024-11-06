import { Component, Input } from '@angular/core';
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

}
