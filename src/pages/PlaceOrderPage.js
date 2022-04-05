import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'

import {Button, Row, Col, ListGroup, Image,Card} from 'react-bootstrap'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

import {createOrder} from '../actions/orderActions'

import {ORDER_CREATE_RESET} from '../constants/orderConstants'

const PlaceOrderPage = () => {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
  cart.taxPrice = Number((cart.itemsPrice * (0.0625)).toFixed(2))
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

  if(!cart.shippingAddress){
    navigate('/shipping')
  }

  useEffect(() => {
    if (success){
      navigate(`/order/${order.id}`)
      dispatch({type: ORDER_CREATE_RESET})
    }
  },[success, navigate, dispatch])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }
  return(
    <div>
      <CheckoutSteps step1 step2 step3 step4/>

      <Row>
        <Col md={8}>
          <ListGroup variant ='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}  {cart.shippingAddress.city}  {cart.shippingAddress.state}
                {cart.shippingAddress.zip}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method: </h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Detail: </h2>
              {cart.cartItems.length === 0
                ? <Message variant ='info'> Your Cart is Empty </Message>
                : (<ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>

                          <Col>
                            <Link to={`/book/${item.bookId}`}>{item.name}</Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>)}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item> <h2>Order Summary</h2> </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${cart.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cart.shippingPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${cart.taxPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${cart.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>


              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-block'
                  disabled={cart.cartItems === 0}
                  onClick = {placeOrder}>
                  Place Order
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderPage
