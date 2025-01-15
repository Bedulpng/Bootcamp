import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Header/NavbarA';
import CircularChart from '../Chart/CircularChart';
import RoleTable from '../table/RoleTable';
import UserTable from '../table/UserTabel';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';


const mockClasses = [
  { id: 1, name: 'Web Development', batch: 'A', participants: 25, status: 'active' },
  { id: 2, name: 'Mobile Development', batch: 'B', participants: 20, status: 'ended' },
  { id: 3, name: 'Data Science', batch: 'C', participants: 30, status: 'active' },
];

const DashboardA: React.FC = () => {
  const navigate = useNavigate()
const handleSeeMore = () => {
  navigate ('/usermanage')
}
const handleAddRole = () => {
  navigate ('/addrole')
}
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="rounded flex-1 p-8 bg-[#0020f6]">
          <h1 className="text-2xl font-bold mb-6 text-white">General Report</h1>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <CircularChart percentage={0} title="Trainee Login Activity" />
            <CircularChart percentage={85} title="Class" />
            <CircularChart percentage={90} title="Challenge" />
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-3 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Registered User</h2>
                <UserTable />
                <div className="mt-4 text-center">
                  <button
                  onClick={handleSeeMore}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">View More</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Class Activity</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-center py-3 px-4 font-semibold">Class Name</th>
                        <th className="text-center py-3 px-4 font-semibold">Batch</th>
                        <th className="text-center py-3 px-4 font-semibold">Total Participants</th>
                        <th className="text-center py-3 px-4 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockClasses.map(classItem => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-center">
                            <span className="text-blue-600">{classItem.name}</span>
                          </td>
                          <td className="py-3 px-4 text-center">{classItem.batch}</td>
                          <td className="py-3 px-4 text-center">{classItem.participants}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              classItem.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {classItem.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-blue-600 cursor-pointer">Edit</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-red-600 cursor-pointer">Delete</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button 
                  className="mt-4 text-center w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">View More</button>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <RoleTable />
              <button
              onClick={handleAddRole} 
              className="w-full mt-4 bg-white text-[#0020f6] py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300">
          <Plus size={16} />
          Add Role
        </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardA;