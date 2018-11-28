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

    }
    return state;
}
