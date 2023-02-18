import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private activaredRoute: ActivatedRoute) { }

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

}
