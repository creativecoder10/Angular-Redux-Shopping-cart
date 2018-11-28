import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartActions } from '../../redux/cart.model.action';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnChanges {

  @Input() shoppingItemsData;
  @Input() selectedItem;
  @Output() alert: EventEmitter<any> = new EventEmitter();

  shoppingForm: FormGroup;
  price: number;
  updateItem = false;

  constructor(
    private formBuilder: FormBuilder,
    private cartActions: CartActions
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedItem) {
      this.buildForm();
      this.changeItem();
      this.updateItem = true;
    }
  }

  buildForm = () => {
    this.shoppingForm = new FormGroup({
      item: new FormControl(this.selectedItem.item, [Validators.required]),
      quantity: new FormControl(this.selectedItem.quantity, [Validators.required]),
      price: new FormControl(this.selectedItem.price)
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
    this.alert.emit('add');
  }

  updateCart(): void {
    this.cartActions.editData({
      id: this.selectedItem.id,
      item: this.shoppingForm.controls.item.value,
      quantity: this.shoppingForm.controls.quantity.value,
      price: this.price
    });
    this.cancel();
    this.updateItem = false;
    this.alert.emit('update');
  }

}
