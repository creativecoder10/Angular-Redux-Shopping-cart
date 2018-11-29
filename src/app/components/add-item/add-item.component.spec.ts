import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './add-item.component';
import { CartActions } from '../../redux/cart.model.action';

const CartActionsMock = {
  addToData() { },
  editData() { }
};

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: CartActions, useValue: CartActionsMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    component.selectedItem = { item: null, quantity: null, price: null };
    fixture.detectChanges();
  });

  it('should create componet for add-item', () => {
    expect(component).toBeTruthy();
  });

  describe('Add/ edit items', () => {
    it('should add the item to the cart', () => {
      const service = TestBed.get(CartActions);
      const spy = spyOn(service, 'addToData');
      component.buildForm();
      component.addToCart();
      expect(spy).toHaveBeenCalled();
    });

    it('should add the item to the cart', () => {
      const service = TestBed.get(CartActions);
      const spy = spyOn(service, 'editData');
      component.buildForm();
      component.updateCart();
      expect(spy).toHaveBeenCalled();
    });
  });
});
