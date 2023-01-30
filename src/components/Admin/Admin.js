import SideBar from "./SideBar"
import { BiMenu } from "react-icons/bi";
import { useState } from "react"
import { Outlet } from "react-router-dom";
import "./Admin.scss";

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
                <span className="sidebarIcon">
                    <BiMenu onClick={() => setCollapsed(!collapsed)} />
                </span>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin