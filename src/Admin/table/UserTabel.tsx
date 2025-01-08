import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { UserActivity } from '../Types/index';

interface UserTableProps {
  users: UserActivity[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">User Activity</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className="flex space-x-2">
                  <button className="btn btn-sm btn-ghost">
                    <Pencil size={16} />
                  </button>
                  <button className="btn btn-sm btn-ghost text-error">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-4">View More</button>
    </div>
  );
};

export default UserTable;