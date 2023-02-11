import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/scss/styles.scss';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/sidebarImg.jpg';
const SideBar = (props) => {
    const { collapsed, } = props
    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Duy Nguyen Project
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/" />
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<FaGem />}> Components</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        title="Management"
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem>
                            <Link to="manage-users" />
                            Manage User
                        </MenuItem>
                        <MenuItem>
                            <Link to="manage-quizs" />
                            Manage Quiz</MenuItem>
                        <MenuItem>
                            <Link to="manage-questions" />
                            Manage Answer</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/Dua24/hoc_react"
                        className="sidebar-btn"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            <span className="mx-2">DUY NGUYEN</span>
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar >
    )
}

export default SideBar