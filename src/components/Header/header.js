import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { logOut } from "../../services/apiServices"
import { doLogout } from "../../redux/action/userAction.js"
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react'
import ModalProfile from './Profile/Profile';
const Header = () => {
    const { isAuthenticated, account } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const handleClickBtnLogin = () => {
        navigate("/login")
    }
    const handleClickBtnRegister = () => {
        navigate("/register")
    }
    const handleLogOut = async () => {
        const res = await logOut(account.email, account.refresh_token)
        if (res.EC == 0) {
            toast.success(res.EM)
            dispatch(doLogout(res))
            navigate("/")
        } else {
            toast.error(res.EM)
        }
    }
    // const account = useSelector(state => state.user.account)

    const [showModalProfile, setShowModalProfile] = useState(false)

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink className="navbar-brand" to="/">DUY NGUYEN</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">{t('header.nav-link1')}</NavLink>
                        <NavLink className="nav-link" to="/users">{t('header.nav-link2')}</NavLink>
                        <NavLink className="nav-link" to="/admins">{t('header.nav-link3')}</NavLink>
                    </Nav>
                    <Nav className="nav-logInOut">
                        {!isAuthenticated ?
                            <>
                                <button onClick={() => handleClickBtnLogin()} className="btn-login">{t('header.nav-userAction.btnLogin')}</button>
                                <button onClick={() => handleClickBtnRegister()} className="btn-signup">{t('header.nav-userAction.btnSignUp')}</button>
                            </>
                            :
                            <NavDropdown title={t('header.nav-userAction.title')} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => setShowModalProfile(true)} >{t('header.nav-userAction.btnProfile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.nav-userAction.btnLogOut')}</NavDropdown.Item>
                            </NavDropdown>

                        }
                        <Language />

                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ModalProfile
                show={showModalProfile}
                setShow={setShowModalProfile}
            />
        </Navbar>
    );
}

export default Header;