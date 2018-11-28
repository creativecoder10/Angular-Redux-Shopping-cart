import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public shoppingItemsData;

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
}
