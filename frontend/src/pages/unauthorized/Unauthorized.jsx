import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-6 rounded-lg shadow-md mx-4">
      <h1 className="text-6xl font-extrabold mb-6">403</h1>
      <h2 className="text-3xl font-semibold mb-4">Unauthorized</h2>
      <p className="mb-8 text-center max-w-md">
        Sorry, you don’t have permission to view this page.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-6 rounded transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;
