import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import {Person, Cart} from 'react-bootstrap-icons'
import {LinkContainer} from 'react-router-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import SearchBox from './SearchBox'

import {logout} from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const dispatch = useDispatch()

  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return(
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>Librain</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto">
                <LinkContainer to='/cart'>
                  <Nav.Link> <Cart /> Cart </Nav.Link>
                </LinkContainer>
                {userInfo
                  ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  )
                  : (
                      <LinkContainer to='/login'>
                      <Nav.Link> <Person /> Login </Nav.Link>
                      </LinkContainer>
                  )}

              </Nav>

              <SearchBox />
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header
