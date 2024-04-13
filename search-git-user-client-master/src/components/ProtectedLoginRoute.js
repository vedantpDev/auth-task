import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLoginRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      JSON.stringify(localStorage.getItem("firebaseUser")) ||
      localStorage.getItem("accessToken")
    ) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedLoginRoute;
