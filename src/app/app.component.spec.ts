import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpService } from './services/http.service';
import { Observable, of, throwError } from 'rxjs';

const HttpServiceMock = {
  getItemDetails() {
    return of({
      items: [{
        name: 'Bread',
        typeCode: 1,
        price: 2
      }
      ]
    });
  }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: HttpService, useValue: HttpServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  describe('API call to item data', () => {
    describe('on success', () => {
      it('should get the item data', async(() => {
        component.getItemList();
        expect(component.shoppingItemsData).toEqual([{ name: 'Bread', typeCode: 1, price: 2 }]);
      }));
    });

    describe('on failure', () => {
      it('should not render the item list', async(() => {
        const service = TestBed.get(HttpService);
        const spy = spyOn(service, 'getItemDetails').and.returnValue(throwError({}));
        component.getItemList();
        expect(component.shoppingItemsData).toEqual(null);
      }));
    });
  });

  describe('Alerts', () => {
    it('should render the alert message on adding new item', async(() => {
      component.setAlert('add');
      expect(component.alert).toEqual('Item added to the cart');
    }));

    it('should render the alert message on editing an item', async(() => {
      component.setAlert('edit');
      expect(component.alert).toEqual('Item updated');
    }));
  });

});
