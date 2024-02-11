import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logo from '../assets/usac_logo_white.svg';
import { Cart } from 'react-bootstrap-icons';

function CustomNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
        <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                MarketUSAC
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="">Home</Nav.Link>
                <Nav.Link href="">Explore</Nav.Link>
                <Nav.Link href="">My Orders</Nav.Link>
            </Nav>

            <Nav className="ml-auto">
                <Nav.Link href="">
                    <Cart />
                </Nav.Link>
                <Nav.Link href="" className='mx-2'>My Profile</Nav.Link>
                <Button 
                    style={{
                        backgroundColor:"#a6a7a9",
                        color:"#fff",
                        border:"none",
                    }}
                >Log Out</Button>
            </Nav>

        </Container>
    </Navbar>
  );
}

export default CustomNavbar;