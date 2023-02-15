import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
    const { isAuthenticated, account } = useSelector(state => state.user)

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute