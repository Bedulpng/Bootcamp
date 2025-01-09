import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { ClassActivity } from '../Types/index';
    
interface ClassTableProps {
  classes: ClassActivity[];
}

const ClassTable: React.FC<ClassTableProps> = ({ classes }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Class Activity</h3>
      <div className="overflow-x-auto">
        <table className="table items-center">
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
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.name}</td>
                <td>{classItem.batch}</td>
                <td>{classItem.participants}</td>
                <td>
                  <span className={`badge ${classItem.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {classItem.status}
                  </span>
                </td>
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
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">View More</button>
    </div>
  );
};

export default ClassTable;