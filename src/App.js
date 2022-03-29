import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import BookPage from './pages/BookPage'

import {Container} from 'react-bootstrap'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className = 'py-3'>
        <Container>
          <Routes>
            <Route path='/' element= <Home /> exact />
            <Route path='/book/:id' element= <BookPage /> />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
