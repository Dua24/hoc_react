import "./Admin.scss";
import SideBar from "./SideBar"
import { BiMenu } from "react-icons/bi";
import { useState } from "react"
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from "../Header/Language";
import { useTranslation, Trans } from 'react-i18next';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const { t } = useTranslation();

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
                            <NavDropdown.Item >{t('header.nav-userAction.btnProfile')}</NavDropdown.Item>
                            <NavDropdown.Item>{t('header.nav-userAction.btnLogOut')}</NavDropdown.Item>
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
        </div>
    )
}

export default Admin