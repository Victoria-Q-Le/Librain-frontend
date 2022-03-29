import {Row, Col} from 'react-bootstrap'

import Book from '../components/Book'
import {listBooks} from '../actions/bookActions'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const bookList = useSelector(state => state.bookList)
  const {error, loading, books} = bookList

  useEffect(() => {
    dispatch(listBooks())
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

/*useEffect got triggered everytime when the components loaded
The state contains many information(books [], loading, error) so I destructured the data and tell it what I want to use*/
