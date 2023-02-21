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
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const SideBar = (props) => {
    const { collapsed, } = props
    const { t } = useTranslation();
    const navigate = useNavigate()
    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
        >
            <SidebarHeader>
                <div
                    onClick={() => navigate("/")}
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        cursor: "pointer"
                    }}
                >
                    {t('admin.sidebar.main-title')}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                    >
                        <Link to="/admins" />
                        {t('admin.sidebar.menuItem1')}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}> {t('admin.sidebar.menuItem2')}</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        title={t('admin.sidebar.menuItem3.title')}
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem>
                            <Link to="manage-users" />
                            {t('admin.sidebar.menuItem3.manageFunc1')}
                        </MenuItem>
                        <MenuItem>
                            <Link to="manage-quizs" />
                            {t('admin.sidebar.menuItem3.manageFunc2')}
                        </MenuItem>
                        <MenuItem>
                            <Link to="manage-questions" />
                            {t('admin.sidebar.menuItem3.manageFunc3')}
                        </MenuItem>
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