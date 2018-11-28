import { ICart } from './cart.model';
import { CartActions } from './cart.model.action';
import { cart_initial_state } from './cart.model.initialstate';

// Adds the data to the redux store
export function cartItemReducer(state: ICart = cart_initial_state, action) {
    switch (action.type) {
        case CartActions.ADD_TO_CART:
            return {
                data: [...state.data, ...action.payload]
            };
        case CartActions.DELETE_FROM_CART:
            return {
                data: [...state.data.filter((item) => item.id !== action.payload.id)]
            };
        case CartActions.EDIT_CART:
            return {
                data: [...state.data.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            id: action.payload.id,
                            item: action.payload.item,
                            price: action.payload.price,
                            quantity: action.payload.quantity
                        };
                    } else {
                        return {
                            ...item
                        };
                    }
                })]
            };

    }
    return state;
}
