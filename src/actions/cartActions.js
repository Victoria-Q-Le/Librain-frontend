import axios from 'axios'

import {CART_ADD_ITEM} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`http://localhost:8000/api/books/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      bookId: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



/*getState allows me to get any part of the part of the state, kinda similar to the useSelector
-book is the id, so when I trigger the dispatch to call the CART_ADD_ITEM reducer, that why inside the item it is the id not the object
-I want to load this data to the localstorage (as a key value pair ) so that when somebody shopping on the website they can add items to their cart, leave the website then come back and they still see the item inside their cart without having to create an account
-The key will be the cartItems
-The value: I used the getState() and set it to the cartItems. go into the store, into cart (cart is an object) then cartItems. And because local storage store everything as kv pair, so the value has to be in string format. */
