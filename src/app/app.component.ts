import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // Subscribing to the data in redux store
  @select(['cartItemReducer', 'data']) shoppingCartData: Observable<any>;

  public shoppingItemsData;
  public selectedItem = {
    id: null, item: null, quantity: null, price: null
  };
  public alert: string;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getItemList();
  }

  getItemList(): void {
    this.httpService.getBusServiceDetails()
      .subscribe((data: any) => {
        this.shoppingItemsData = data.items;
      }, () => {
        this.shoppingItemsData = null;
      });
  }

  editData(item): void {
    this.selectedItem = item;
  }

  setAlert(event): void {
    this.alert = event === 'add' ? 'Item added to the cart' : 'Item updated';
    setTimeout(() => { this.alert = null; }, 3000);
  }
}
