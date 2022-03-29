import {Card} from 'react-bootstrap'
import Rating from'./Rating'
import {Link} from 'react-router-dom'

const Book = ({book}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/book/${book.id}`}>
        <Card.Img src={book.image}/>
      </Link>

      <Card.Body>
        <Link to={`/book/${book.id}`}>
          <Card.Title as='div'>
            <strong>{book.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as ='div'>
          <div className='my-3'>
            <Rating value = {book.rating} text={`${book.numReviews} reviews`} color={'#f8e825'}/>
          </div>
        </Card.Text>

        <Card.Text>
          <h3>${book.price}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Book
