import {Row, Col} from 'react-bootstrap'
import Book from '../components/Book'
const Home = () => {
  return(
    <div>
      <h1>Editor Choice Book</h1>
      <Row>
        {books.map(book => (
          <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book}/>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
