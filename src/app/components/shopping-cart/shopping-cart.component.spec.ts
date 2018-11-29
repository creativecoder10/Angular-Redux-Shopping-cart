import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CartActions } from '../../redux/cart.model.action';

const CartActionsMock = {
  addToData() { },
  deleteFromData() { }
};

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [{ provide: CartActions, useValue: CartActionsMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    component.shoppingCartData = {
      id: 1233,
      item: 'apple',
      quantity: 2,
      price: 5
    };
    fixture.detectChanges();
  });

  it('should create shopping-cart component', () => {
    expect(component).toBeTruthy();
  });

  describe('Cart display/ change', () => {
    it('should delete the item in the cart', () => {
      const item = {
        id: 1233, item: 'apple', quantity: 2, price: 5
      };
      const service = TestBed.get(CartActions);
      const spy = spyOn(service, 'deleteFromData');
      component.deleteItem(item);
      expect(spy).toHaveBeenCalledWith({ id: 1233 });
    });

    it('should display the total price of the items', () => {
      expect(component.getTolal([{ id: 1233, item: 'apple', quantity: 2, price: 5 },
      { id: 1233, item: 'apple', quantity: 2, price: 10 }])).toEqual(15);
    });
  });
});
