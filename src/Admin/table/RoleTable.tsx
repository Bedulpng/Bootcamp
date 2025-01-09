import React from 'react';
import { Plus } from 'lucide-react';

const roles = [
  { name: 'Trainee', color: 'bg-yellow-300' },
  { name: 'Mentor', color: 'bg-blue-300' },
  { name: 'Examiner', color: 'bg-purple-300' },
  { name: 'Supervisor', color: 'bg-green-300' },
];

const RoleTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Registered Role</h3>
      <div className="space-y-2">
        {roles.map((role) => (
          <div 
            key={role.name}
            className={`${role.color} p-2 rounded-lg text-black font-medium text-center`}
          >
            {role.name}
          </div>
        ))}
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
          <Plus size={16} />
          Add Role
        </button>
      </div>
    </div>
  );
};

export default RoleTable;