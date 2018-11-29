import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { ICart } from './cart.model';

type Payload = ICart[];
/* istanbul ignore next */
@Injectable()
export class CartActions {
    static readonly ADD_TO_CART = 'ADD_TO_CART';
    static readonly DELETE_FROM_CART = 'DELETE_FROM_CART';
    static readonly EDIT_CART = 'EDIT_CART';

    @dispatch()
    addToData = (payload) => ({
        type: CartActions.ADD_TO_CART,
        payload: payload
    })

    @dispatch()
    deleteFromData = (payload) => ({
        type: CartActions.DELETE_FROM_CART,
        payload: payload
    })

    @dispatch()
    editData = (payload) => ({
        type: CartActions.EDIT_CART,
        payload: payload
    })
}
