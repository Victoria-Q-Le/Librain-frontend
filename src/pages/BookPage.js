import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import {House} from 'react-bootstrap-icons'
import Rating from '../components/Rating'

const BookPage = ({match}) => {
  const book = books.find((b) => b.id == match.params.id)
  return(
    <div>
      <Link to='/' className='btn btn-light my-3'> <House /> </Link>
      <Row>
        <Col md={6}>
          <Image src={book.image} alt={book.name} fluid/>
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

      </Row>
    </div>
  )
}

export default BookPage
