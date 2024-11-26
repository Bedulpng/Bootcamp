// src/pages/Dashboard/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {

  return (
    <div className="h-full flex flex-col">

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        <div
          className="rounded-lg h-48 flex flex-col items-start justify-center text-white text-xl font-bold p-6"
          style={{
            backgroundImage: 'url(/image/background.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span className="text-4xl">Welcome Back,</span>
          <span className="text-3xl">Admin</span>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
