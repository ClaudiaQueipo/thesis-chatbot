
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth';

export default function ProtectedRoute({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" />
    }
    return <>{children}</>
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};