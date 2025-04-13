import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setLoader(true);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <h1 className="mt-4 text-lg font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
