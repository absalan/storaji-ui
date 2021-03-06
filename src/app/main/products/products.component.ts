import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/classes/product';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'storaji-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(
    private _productService: ProductsService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.get();
    this._productService.products.subscribe(
      data => (data instanceof Array) ? this.products = data : data
    );
  }

}
