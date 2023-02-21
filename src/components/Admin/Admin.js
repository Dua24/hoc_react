import "./Admin.scss";
import SideBar from "./SideBar"
import { BiMenu } from "react-icons/bi";
import { useState } from "react"
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from "../Header/Language";
import { useTranslation, Trans } from 'react-i18next';
import ModalProfile from "../Header/Profile/Profile";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logOut } from "../../services/apiServices"
import { useDispatch } from "react-redux"
import { doLogout } from "../../redux/action/userAction.js"
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, account } = useSelector(state => state.user)
    const { t } = useTranslation();
    const [show, setShow] = useState(false)

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

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>

            <div className="admin-content ">
                <div className="admin-header-content" >
                    <span className="sidebarIcon">
                        <BiMenu onClick={() => setCollapsed(!collapsed)} />
                    </span>

                    <div style={{ display: 'flex', gap: "15px" }}>
                        <NavDropdown title={t('header.nav-userAction.title')} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setShow(true)}>{t('header.nav-userAction.btnProfile')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.nav-userAction.btnLogOut')}</NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>


                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
            <ModalProfile
                show={show}
                setShow={setShow}
            />
        </div>
    )
}

export default Admin