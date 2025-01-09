import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Header/NavbarA';

const UserManage = () => {
    return (
        <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8 bg-[#0020f6]">
            </main>
            </div>
            </div>
    );
};

export default UserManage;