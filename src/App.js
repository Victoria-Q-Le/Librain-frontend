import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import BookPage from './pages/BookPage'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/Profile'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'

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

            <Route path='/cart/:id' element= <Cart /> />
            <Route path='/cart' element= <Cart /> />

            <Route path='/login' element= <Login /> />
            <Route path='/register' element= <Register /> />
            <Route path='/profile' element= <ProfilePage /> />
            <Route path='/shipping' element= <ShippingPage /> />
            <Route path='/payment' element= <PaymentPage /> />
            <Route path='/placeorder' element= <PlaceOrderPage /> />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

/* to make an id optional in cart I threw in the ?*/
