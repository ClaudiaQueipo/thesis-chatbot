
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import { isAdmin } from '../utils/auth';

export default function AdminRoute({ children }) {

    if (!isAdmin()) {
        return <Navigate to="/" />
    }
    return <>{children}</>
}

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};