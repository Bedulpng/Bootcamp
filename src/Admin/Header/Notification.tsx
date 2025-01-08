import React from 'react';
import { Bell } from 'lucide-react';

const NotificationButton = () => {
  const notifications = 3; // Example count

  return (
    <div className="relative">
      <button className="btn btn-ghost btn-circle">
        <Bell size={20} />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {notifications}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationButton;