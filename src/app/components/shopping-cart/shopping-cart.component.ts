import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CartActions } from '../../redux/cart.model.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  @Input() shoppingCartData: Observable<any>;
  @Output() editData: EventEmitter<any> = new EventEmitter();

  constructor(
    private cartActions: CartActions
  ) { }

  deleteItem(item): void {
    this.cartActions.deleteFromData({
      id: item.id
    });
  }

  getTolal(items): number {
    return items.map((item) => item.price).reduce((a, b) => a + b, 0);
  }

  editItem(item) {
    this.editData.emit(item);
  }

}
