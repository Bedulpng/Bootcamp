import React from 'react';
import { Plus } from 'lucide-react';

interface Role {
  name: string;
  color: string;
}

const roles: Role[] = [
  { name: 'Trainee', color: 'bg-yellow-200' },
  { name: 'Mentor', color: 'bg-pink-200' },
  { name: 'Examiner', color: 'bg-purple-200' },
  { name: 'Supervisor', color: 'bg-green-200' },
];

const RoleTable = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Registered Role</h3>
      <div className="space-y-2">
        {roles.map((role) => (
          <div 
            key={role.name}
            className={`${role.color} p-2 rounded-lg text-gray-800`}
          >
            {role.name}
          </div>
        ))}
        <button className="btn btn-primary w-full">
          <Plus size={16} />
          Add Role
        </button>
      </div>
    </div>
  );
};

export default RoleTable;