import {Link, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import {House} from 'react-bootstrap-icons'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listBookDetails} from '../actions/bookActions'

const BookPage = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const bookDetails = useSelector(state => state.bookDetails)
  const {loading, error, book} = bookDetails

  useEffect(() => {
    dispatch(listBookDetails(id))
  }, [dispatch])

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

                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={book.countInStock == 0}>Add to Cart</Button>
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
