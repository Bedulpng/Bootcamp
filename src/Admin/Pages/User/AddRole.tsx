import React, { useState } from "react";
import Navbar from '../../Header/NavbarA';

const AddRole: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const saveRole = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex justify-center items-center px-8 py-16">
        <div className="w-full w-[98vw] max-w-80xl bg-[#0020f6] text-white rounded-lg shadow-md px-16 py-12">
          <h1 className="text-[30px] font-bold mb-12 text-left">Create New Role</h1>
          <form>
            <div className="mb-10">
              <label htmlFor="roleName" className="block text-[20px] font-medium mb-4">
                Name:
              </label>
              <input
                type="text"
                id="roleName"
                placeholder="Enter role name"
                className="w-full p-4 rounded border border-gray-300 text-black text-lg"
              />
            </div>
            <div className="bg-white text-black p-10 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-8 text-center">Permission</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can see all user</span>
                  </label>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can see several user</span>
                  </label>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can edit all user</span>
                  </label>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can edit several user</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can delete all user</span>
                  </label>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can delete several user</span>
                  </label>
                  <label className="flex items-center mb-6">
                    <input type="checkbox" className="mr-4 w-6 h-6" />
                    <span className="text-lg">Can add user</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                type="button"
                onClick={saveRole}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded text-lg"
              >
                Save Role
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddRole;
