import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !JSON.stringify(localStorage.getItem("firebaseUser")) ||
      !localStorage.getItem("accessToken")
    ) {
      navigate("/sign-up");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
