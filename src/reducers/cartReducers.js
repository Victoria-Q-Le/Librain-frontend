import {CART_ADD_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: []}, action) => {
  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.book === item.book)
      if (existItem){
        return{
          ...state,
          cartItems: state.cartItems.map(x =>
            x.book === existItem.book ? item : x
          )
        }
      } else {
        return {
          ...state,
          cartItems:[...state.cartItems, item]

        }
      }
    default:
      return state
  }
}


/*For the first case: I want to check if the product that I send back inside the action.payload  exist inside the cartItems arr,if the item is already inside the arr then I just want to update he qty, if it isnt then I want to add it to the arr. item is the item I want to send to cart inside the payload, existItem is an object that I will use to loop through all the items inside the cart to compare,
  if these 2 values match then only update the qty, by mapping through the cartItems arr to find that item and update the qty
  if none is matched then add the object inside payload to the array */
