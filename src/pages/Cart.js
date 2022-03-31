import {useEffect} from 'react'
import {Link, useParams, useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'

import Message from '../components/Message'

import {addToCart} from '../actions/cartActions'

const Cart = ({history}) => {
  const {id} = useParams()

  const strQty = useLocation().search.split('=')[1]
  const qty = Number(strQty)

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  },[dispatch, id, qty])

  const removeFromCart = (id) => {
    console.log('remove', id);
  }

  return(
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0
          ? (<Message variant='info'> Your Cart is Empty <Link to='/'> Keep Shopping </Link> </Message>)
          : (
              <ListGroup variant ='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.bookId}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                      </Col>

                      <Col md={3}>
                        <Link to={`/book/${item.bookId}`}>{item.name}</Link>
                      </Col>

                      <Col md={2}> ${item.price} </Col>

                      <Col md={3}>
                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.bookId, e.target.value))}>
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value ={x+1}>
                                {x +1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>

                      <Col md={1}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={(e) => removeFromCart(item.bookId)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty,0)}) items </h2>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    )
}

export default Cart

/*When customer select the qty and they click on the addToCart button, they will send to a link `/cart/${id}?qty=${qty}. Ex: I want to add book whose id is 2 and I want to add 3 of them into my cart`
- useParams is used to access the id of url and save it into bookId,bookId is now 2
- useLocation first give back  and object {pathname: '/cart/2', search: '?qty=3', hash: '', state: null, key: 'jbgzc80p'}. Then I want to obtain the qty by choosing the search. After that I want to split this string into smaller index by the '=' sign. The actual qty number will have index number 1
Copy the Form Control from BookPage, but made some changes to the function, because we are looping through the cartItems arr so we had access to the item, so I changed the variable from 'qty' to 'item', I also didnt have the setQty state, so I changed it to dispatch function addToCart
In the Subtotal, I want to count all the books inside the cart including different books and multiple copies of the same books, thus I wrote an expression using reduce function - a higher arr method. Reduce takes in 2 params: the accumulator, and the item and I also had to set the number where the accumulator goes which is 0*/
