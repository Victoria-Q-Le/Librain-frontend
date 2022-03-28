import {Navbar, Nav, Container, Row} from 'react-bootstrap'
import {Person, Cart} from 'react-bootstrap-icons'
const Header = () => {
  return(
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand href="/">Librain</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/cart"> <Cart /> Cart </Nav.Link>
                <Nav.Link href="/login"> <Person /> Login </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header
