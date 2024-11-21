import { Injectable } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { findAll, load } from '../products.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(load),
        exhaustMap(() => this.service.findAll())
      )
      .pipe(map((products) => findAll({ products })))
  );
  constructor(private actions$: Actions, private service: ProductService) {}
}
