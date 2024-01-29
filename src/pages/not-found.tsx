import { Navigate } from 'react-router-dom';

const NotFound = () => {
    return <Navigate to={'/pages/error/error404'} />;
};

export default NotFound;
