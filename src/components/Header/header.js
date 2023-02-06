import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate()
    const handleClickBtnLogin = () => {
        navigate("/login")
    }
    const handleClickBtnRegister = () => {
        navigate("/register")
    }

    const { isAuthenticated, account } = useSelector(state => state.user)
    // const account = useSelector(state => state.user.account)

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink className="navbar-brand" to="/">DUY NGUYEN</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/users">Users</NavLink>
                        <NavLink className="nav-link" to="/admins">Admin</NavLink>
                    </Nav>
                    <Nav>
                        {!isAuthenticated ?
                            <>
                                <button onClick={() => handleClickBtnLogin()} className="btn-login">Log in</button>
                                <button onClick={() => handleClickBtnRegister()} className="btn-signup">Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item >Log out</NavDropdown.Item>
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                            </NavDropdown>

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;