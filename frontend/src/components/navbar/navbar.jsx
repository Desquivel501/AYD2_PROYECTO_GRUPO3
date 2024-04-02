import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/market_logo_white.png';
import { Cart } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { navbar_routes } from '../../utilities/navbar_routes';

function CustomNavbar() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate('/log-in');
    }

    const user = localStorage.getItem('user');

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
                    {/* <Nav.Link href="">Home</Nav.Link>
                    <Nav.Link href="">Explore</Nav.Link>
                    <Nav.Link href="">My Orders</Nav.Link> */}

                    {
                        user && JSON.parse(user).type === 1 ?
                            navbar_routes.usuario.map((route, index) => (
                                <Nav.Link key={index} href={route.path}>{route.name}</Nav.Link>
                            ))
                            : user && JSON.parse(user).type === 2 ?
                                navbar_routes.vendedor.map((route, index) => (
                                    <Nav.Link key={index} href={route.path}>{route.name}</Nav.Link>
                                ))
                                : user && JSON.parse(user).type === 0 ?
                                    navbar_routes.admin.map((route, index) => (
                                        <Nav.Link key={index} href={route.path}>{route.name}</Nav.Link>
                                    ))
                                    : null
                    }

                </Nav>

                <Nav className="ml-auto">
                    
                    {
                        user && JSON.parse(user).type === 1 ?
                            <Nav.Link href="/carrito">
                                <Cart size={24} />
                            </Nav.Link>
                            : null
                    }

                    <Nav.Link href="/profile" 
                    className='mx-2'>Mi Perfil</Nav.Link>
                    <Button
                        style={{
                            backgroundColor: "#a6a7a9",
                            color: "#fff",
                            border: "none",
                        }}
                        onClick={handleLogOut}
                    >Cerrar Sesión</Button>
                </Nav>

            </Container>
        </Navbar>
    );
}

export default CustomNavbar;