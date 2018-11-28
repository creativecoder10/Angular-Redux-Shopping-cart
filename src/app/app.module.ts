import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { rootReducer } from './redux/root.reducer';
import { CartActions } from './redux/cart.model.action';

import { HttpService } from './services/http.service';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule
  ],
  providers: [HttpService, CartActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    devTools: DevToolsExtension
  ) {
    const devtoolInstalled = !!window['__REDUX_DEVTOOLS_EXTENSION__'];
    const enhancers = (isDevMode() && devtoolInstalled) ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, {}, [], enhancers);
  }
}
