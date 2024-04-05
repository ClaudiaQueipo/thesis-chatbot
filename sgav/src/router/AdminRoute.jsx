
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import authService from '../services/auth.service';
import { getUser } from '../utils/auth';

export default function AdminRoute({ children }) {

    const isAdmin = authService.isAdmin({ email: getUser() })
    if (!isAdmin()) {
        return <Navigate to="/" />
    }
    return <>{children}</>
}

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};