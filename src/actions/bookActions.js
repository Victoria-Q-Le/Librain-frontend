import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,

  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
} from '../constants/bookConstants'
import axios from 'axios'

export const listBooks = () => async (dispatch) => {
  try{
    dispatch({type: BOOK_LIST_REQUEST})
    const {data} = await axios.get(`https://librain-backend.herokuapp.com/api/books/`)
    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}


export const listBookDetails = (id) => async (dispatch) => {
  try{
    dispatch({type: BOOK_DETAILS_REQUEST})
    const {data} = await axios.get(`https://librain-backend.herokuapp.com/api/books/${id}`)
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}
