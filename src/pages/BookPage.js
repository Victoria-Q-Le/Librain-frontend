import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import {House} from 'react-bootstrap-icons'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listBookDetails} from '../actions/bookActions'

const BookPage = () => {
  const [qty, setQty] = useState(1)
  const {id} = useParams()
  const dispatch = useDispatch()
  const bookDetails = useSelector(state => state.bookDetails)
  const {loading, error, book} = bookDetails

  useEffect(() => {
    dispatch(listBookDetails(id))
  }, [dispatch,id])

  const addToCart = () => {
    console.log('add to Cart', id);
  }

  return(
    <div>
      <Link to='/' className='btn btn-light my-3'> <House /> </Link>

      {loading
        ? <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
          :
            (<Row>
              <Col md={6}>
                <Image src={book.image} alt={book.name} fluid />
              </Col>

              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{book.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={book.rating} text ={`${book.numReviews} reviews`} color={'#f8e825'} />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price: ${book.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {book.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col><strong>${book.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Availability: </Col>
                        <Col>
                          {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {book.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty: </Col>
                          <Col xs ='auto' className='my-1'>
                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(book.countInStock).keys()].map((x) => (
                                  <option key={x+1} value ={x+1}>
                                    {x +1}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                    )}

                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={book.countInStock === 0}
                        onClick={addToCart}> Add to Cart </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>)
      }


    </div>
  )
}

export default BookPage

/* for the dropdown menu, instead of hard coding I tried to make it more dynamic by comparing with the countInStock value to make sure the maximum qty customer can add to their cart is the maximum we have in stock. I created an array and used array constructor, ex if the countInStock is 3 then the array constructor will create an array [0,1,2] then I will map throught this array, x will be the current count of that array, on each interation create an <option> for each option, the output text is {x+1} because the array starts at 0*/
