import React from 'react';

// Export the roles array
export const roles = [
  { name: 'Trainee', color: 'bg-yellow-300' },
  { name: 'Mentor', color: 'bg-blue-300' },
  { name: 'Examiner', color: 'bg-purple-300' },
  { name: 'Supervisor', color: 'bg-green-300' },
  { name: 'Admin', color: 'bg-gray-300' },
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
      </div>
    </div>
  );
};

export default RoleTable;
