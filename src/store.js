import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import  {bookListReducer, bookDetailsReducer} from './reducers/bookReducers'
import  {cartReducer} from './reducers/cartReducers'

const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  cart:cartReducer,
})

const cartItemsfromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: {cartItems: cartItemsfromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


/*
-const cartItemsfromStorage: I want to load the cart data that stored in the local storage into the initial state, and I have to parse it because right now it's in the string format (local storage can only store kv pair), if these items exist return the value, if it is not, return an empty arr*/
