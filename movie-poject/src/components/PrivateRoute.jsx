
import { Navigate } from 'react-router-dom'; // Import Navigate
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    element // Render the passed element if the user is authenticated
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;