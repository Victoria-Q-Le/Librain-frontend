import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL
} from '../constants/bookConstants'

export const bookListReducer  = (state = {books: []}, action) => {
  switch(action.type){
    case BOOK_LIST_REQUEST:
      return{loading:true, books:[]}

    case BOOK_LIST_SUCCESS:
      return{loading:true, books: action.payload}

    case BOOK_LIST_FAIL:
      return{loading:false, error: action.payload}

    default:
      return state
  }
}
/*Reducers are functions that take in current state and take an action we want to do with the data and depend on the action, the initialState will be updated accardingly and return a new copy to the store.
Firstly, the state was taken in, the state when taken in is an empty book array. Action (which is an object) will also be taken in.
Then the switch statement would help check the action type
*/
