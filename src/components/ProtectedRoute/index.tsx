import { ReactChild } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../store/CurrentUser";

const ProtectedRoute = ({ render }: { render: ReactChild }) => {
  const user = useSelector(selectUser);

  let location = useLocation();

  console.log("Current user: ", user);
  if (!user) {
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  return <>{render}</>;
};

export default ProtectedRoute;
