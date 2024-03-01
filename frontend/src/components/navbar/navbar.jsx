import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/market_logo_white.png';
import { Cart } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate('/log-in');
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
            <Container>
                <Navbar.Brand href="">
                    <img
                        alt=""
                        src={logo}
                        width="auto"
                        height="30"
                        className="d-inline-block align-top"
                    />{''}

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
                            backgroundColor: "#a6a7a9",
                            color: "#fff",
                            border: "none",
                        }}
                        onClick={handleLogOut}
                    >Log Out</Button>
                </Nav>

            </Container>
        </Navbar>
    );
}

export default CustomNavbar;