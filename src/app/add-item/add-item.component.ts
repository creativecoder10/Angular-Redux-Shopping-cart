import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartActions } from '../redux/cart.model.action';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @Input() shoppingItemsData;

  shoppingForm: FormGroup;
  price: number;

  constructor(
    private formBuilder: FormBuilder,
    private cartActions: CartActions
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.shoppingForm = new FormGroup({
      item: new FormControl(null),
      quantity: new FormControl(null),
      price: new FormControl(0)
    });
  }

  changeItem(): void {
    const selectedItem = this.shoppingItemsData.filter((item) => item.name === this.shoppingForm.controls.item.value).shift();
    this.price = this.shoppingForm.controls.quantity.value ? (selectedItem.price * this.shoppingForm.controls.quantity.value) : 0;
    this.shoppingForm.controls.price.setValue('$' + this.price.toString());
  }

  cancel(): void {
    this.shoppingForm.reset();
    this.price = null;
  }

  addToCart(): void {
    this.cartActions.addToData({
      id: new Date().getTime(),
      item: this.shoppingForm.controls.item.value,
      quantity: this.shoppingForm.controls.quantity.value,
      price: this.price
    });
    this.cancel();
  }

}
