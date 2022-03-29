import {Row, Col} from 'react-bootstrap'
import Book from '../components/Book'
import axios from 'axios'
import {useState, useEffect} from 'react'

const Home = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/books/')
      .then((response) => {
        setBooks(response.data)
      })
  }, [])

  return(
    <div>
      <h1>Editor Choice Books</h1>
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

/*useEffect got triggered everytime when the components loaded*/
