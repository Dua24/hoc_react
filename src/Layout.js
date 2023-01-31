import { Route, Routes } from 'react-router-dom'
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import App from './App';
import ManageUsers from './components/Admin/ManageUsers';
import Dashboard from './components/Admin/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Auth from './components/Auth/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                <Route path="login" element={<Auth />}
                />
                <Route path="register" element={<Auth
                    registerComponent
                />}
                />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout