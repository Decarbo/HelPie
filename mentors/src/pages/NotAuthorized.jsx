import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4 text-red-400">🚫 Access Denied</h1>
      <p className="text-gray-400 mb-6">
        You don't have permission to view this page.
      </p>
      <button
        onClick={() => navigate("/sign-in")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
      >
        Go to Sign-In
      </button>
    </div>
  );
};

export default NotAuthorized;
