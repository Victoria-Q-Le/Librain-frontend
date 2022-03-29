import {Navbar, Nav, Container, Row} from 'react-bootstrap'
import {Person, Cart} from 'react-bootstrap-icons'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
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
              <LinkContainer to='/login'>
                <Nav.Link> <Person /> Login </Nav.Link>
              </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header
