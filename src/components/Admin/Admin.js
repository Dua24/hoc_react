import "./Admin.scss";
import SideBar from "./SideBar"
import { BiMenu } from "react-icons/bi";
import { useState } from "react"
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>

            <div className="admin-content">
                <div className="admin-header-content" >
                    <span className="sidebarIcon">
                        <BiMenu onClick={() => setCollapsed(!collapsed)} />
                    </span>
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