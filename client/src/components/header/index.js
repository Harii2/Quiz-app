import Navbar from 'react-bootstrap/Navbar'
import {Container,Offcanvas,Nav} from 'react-bootstrap'
import './index.css'

const Header = ()=>{
    return(
        <Navbar  className='nav-bg' expand={false}>
  <Container fluid>
    <Navbar.Brand id='homeId' href="#">Quiz Application</Navbar.Brand>
    <Navbar.Toggle id="offcanvasNavbar" aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas 
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Explore</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/dash-board">DashBoard</Nav.Link>
          <Nav.Link href="/add-question">Add Question</Nav.Link>
          <Nav.Link href="/write-exam">Write Exam</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
    )
}

export default Header