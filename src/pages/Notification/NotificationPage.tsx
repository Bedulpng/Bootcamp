import { useState } from 'react'

interface NotificationData {
  id: number;
  message: string;
  type: string; // 'system', 'trainee', 'mentor'
  isRead: boolean;
  timestamp: Date;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: 1,
      message: 'New account for trainee has been successfully created.',
      type: 'system',
      isRead: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      message: 'New account for mentor has been successfully created.',
      type: 'system',
      isRead: true,
      timestamp: new Date(new Date().getTime() - 60000), // 1 minute ago
    },
  ]);

  const [selectedTab, setSelectedTab] = useState('system');

  // Hitung jumlah notifikasi yang belum dibaca
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const filteredNotifications = notifications.filter(
    (notif) => notif.type === selectedTab
  );

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>

        {/* Bell Icon */}
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center border-b">
        <div className="flex space-x-4">
          {['system', 'trainee', 'mentor'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? 'font-bold border-b-2 border-blue-500'
                  : 'text-gray-500'
              } px-4 py-2`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-500 hover:underline"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notification List */}
      <div className="mt-4 max-h-80 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 mb-2 rounded-lg ${
                notif.isRead ? 'bg-gray-100' : 'bg-white'
              } shadow`}
            >
              <p
                className={`${
                  notif.isRead ? 'text-gray-500' : 'font-bold'
                }`}
              >
                {notif.message}
              </p>
              <p className="text-xs text-gray-400">
                {notif.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
