import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Link, useParams} from 'react-router-dom'

import {Button, Row, Col, ListGroup, Image,Card} from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import {getOrderDetails} from '../actions/orderActions'

const OrderPage = () => {

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {orderId} = useParams()

  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2)
  }

  useEffect(() => {
    if(!order || order.id !== Number(orderId)){
      dispatch(getOrderDetails(orderId))
    }
  },[order,orderId, dispatch])

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

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
