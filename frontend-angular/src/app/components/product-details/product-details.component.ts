import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from './../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private activaredRoute: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.activaredRoute.paramMap.subscribe(()=>{
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductId: number = +this.activaredRoute.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(data=>{
      this.product = data;
    })
  }

  addToCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
