import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'

import {Row, Col, ListGroup, Image,Card} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'

import Message from '../components/Message'
import Loader from '../components/Loader'

import {getOrderDetails, payOrder} from '../actions/orderActions'

import {ORDER_PAY_RESET} from '../constants/orderConstants'

const OrderPage = () => {

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: succesPay} = orderPay


  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const {orderId} = useParams()

  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
  }

  const addPayPalScript = () => {
    const  script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AYbf8x59GFAxDCHjUC3jj32gra73LBUs6jNY_ZXSoCOYNYA7LG1tSxgqpKnvL2zq273_aoPJrawIltuZ'
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!order || succesPay || order.id !== Number(orderId)){
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId))
    } else if(!order.isPay){
      if (!window.paypal){
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  },[order,orderId, dispatch, succesPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) :  error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order Number: {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant ='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}  {order.shippingAddress.city}  {order.shippingAddress.state}
                {order.shippingAddress.zip}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>Delivered on: {order.deliveredAt}</Message>
              ): (
                <Message variant='warning'>In transit</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method: </h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on: {order.paidAt}</Message>
              ): (
                <Message variant='warning'>Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Detail: </h2>
              {order.orderItems.length === 0
                ? <Message variant ='info'> Order is Empty </Message>
                : (<ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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
                  <Col>${order.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${order.shipping} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${order.tax} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${order.total} </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (<Loader/>) : (<PayPalButton amount={order.total} onSuccess ={successPaymentHandler}/>)}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
