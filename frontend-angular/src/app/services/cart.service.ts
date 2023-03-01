import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity ++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  removeFromCart(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(currentCartItem => currentCartItem.id === theCartItem.id);
    if (this.itemIndexExists(itemIndex)) {
      this.removeItemByIndex(itemIndex);
      this.computeCartTotals();
    }
  }

  private removeItemByIndex(itemIndex: number) {
    this.cartItems.splice(itemIndex, 1);
  }

  private itemIndexExists(itemIndex: number) {
    return itemIndex > -1;
  }

  computeCartTotals() {
    let totalPriceValue: number = 0.00;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}



