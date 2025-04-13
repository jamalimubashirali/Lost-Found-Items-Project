import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({children , adminOnly = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user?.userData?.role === 'admin');
  
  useEffect(() => {
    setLoader(true);
    if(adminOnly && !isAdmin) {
      navigate('/home');
    }
    setLoader(false);
  } , [isAdmin, adminOnly, navigate]);
  return loader ? (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin h-16 w-16 text-blue-500" />
        <h1 className="mt-4 text-lg font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>
  ) : (
    <>
    {children}
    </>
  );
}

export default ProtectedRoute;
