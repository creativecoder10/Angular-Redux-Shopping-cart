import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { cartItemReducer } from './card-item.reducer';

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        cartItemReducer: cartItemReducer
    }));
