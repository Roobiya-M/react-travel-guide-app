import { Navigate, useLocation, useNavigate } from "react-router-dom";

function PrivateRoute({ Component }) {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location----',location)
 
    const userData = JSON.parse(localStorage.getItem('user_data'))

  return userData ? <Component /> : <Navigate to={`/auth/login?next=${location.pathname}`} />;
};
export default PrivateRoute;
