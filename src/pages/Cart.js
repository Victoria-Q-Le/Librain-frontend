import {useEffect} from 'react'
import {Link, useParams, useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'

import Message from '../components/Message'

import {addToCart} from '../actions/cartActions'

const Cart = ({history}) => {
  const {id} = useParams()
  const qty = useLocation().search.split('=')[1]

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
    console.log('cartItems: ', cartItems);

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  },[dispatch, id, qty])

  return(
    <div>
      This is the cart page
    </div>
  )
}

export default Cart

/*When customer select the qty and they click on the addToCart button, they will send to a link `/cart/${id}?qty=${qty}. Ex: I want to add book whose id is 2 and I want to add 3 of them into my cart`
- useParams is used to access the id of url and save it into bookId,bookId is now 2
- useLocation first give back  and object {pathname: '/cart/2', search: '?qty=3', hash: '', state: null, key: 'jbgzc80p'}. Then I want to obtain the qty by choosing the search. After that I want to split this string into smaller index and ignore the '=' sign. The actual qty number will have index number 1 */
