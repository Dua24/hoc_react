import { Route, Routes } from 'react-router-dom'
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import App from './App';
import ManageUsers from './components/Admin/ManageUsers';
import Dashboard from './components/Admin/Dashboard';
const Layout = () => {
    return (
        <>
            <Routes>

                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                </Route>


            </Routes>
        </>
    )
}

export default Layout