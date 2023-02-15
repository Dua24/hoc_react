import { Route, Routes } from 'react-router-dom'
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
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuizs from './components/Admin/Quiz/ManageQuizs';
import Questions from './components/Admin/Questions/Questions';
import ProtectedRoute from './routes/ProtectedRoute';
import { Suspense } from 'react'
const NotFound = () => {
    return (
        <div className="alert alert-danger container">Not found data with current URL</div>
    )
}

const Layout = () => {
    return (
        <Suspense fallback={<div>Loading... </div>}>
            <Routes>

                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <ProtectedRoute>
                            <ListQuiz />
                        </ProtectedRoute>
                    } />
                </Route>
                <Route path="quiz/:quizId" element={<DetailQuiz />} />

                <Route path="admins" element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quizs" element={<ManageQuizs />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="login" element={<Auth
                    loginType
                />}
                />
                <Route path="register" element={<Auth
                    registerType
                />}
                />
                <Route path='*' element={<NotFound />} />
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
        </Suspense>
    )
}

export default Layout