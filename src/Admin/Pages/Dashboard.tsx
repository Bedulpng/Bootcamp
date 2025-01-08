import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Header/NavbarA';
import CircularChart from '../Chart/CircularChart';
import RoleTable from '../table/RoleTable';

const mockUsers = [
  { id: 1, name: 'John Doe', role: 'Trainee' },
  { id: 2, name: 'Jane Smith', role: 'Mentor' },
  { id: 3, name: 'Mike Johnson', role: 'Examiner' },
];

const mockClasses = [
  { id: 1, name: 'Web Development', batch: 'A', participants: 25, status: 'active' },
  { id: 2, name: 'Mobile Development', batch: 'B', participants: 20, status: 'ended' },
  { id: 3, name: 'Data Science', batch: 'C', participants: 30, status: 'active' },
];

const DashboardA = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">General Report</h1>
            <div className="grid grid-cols-3 gap-6">
              <CircularChart percentage={75} title="Trainee Login Activity" />
              <CircularChart percentage={85} title="Class" />
              <CircularChart percentage={90} title="Challenge" />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-3 space-y-8">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">User Activity</h3>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="btn btn-sm btn-ghost">Edit</button>
                          <button className="btn btn-sm btn-ghost text-error">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Class Activity</h3>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th>Batch</th>
                      <th>Total Participants</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockClasses.map(classItem => (
                      <tr key={classItem.id}>
                        <td>{classItem.name}</td>
                        <td>{classItem.batch}</td>
                        <td>{classItem.participants}</td>
                        <td>
                          <span className={`badge ${classItem.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                            {classItem.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-ghost">Edit</button>
                          <button className="btn btn-sm btn-ghost text-error">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-1">
              <RoleTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardA;