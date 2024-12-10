import { useState } from 'react';
import { Mail, MailOpen, Filter } from 'lucide-react';
import MainLayout from '../../Layouts/MainLayout';

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    SYSTEM: [
      { id: 1, title: "System maintenance scheduled for tomorrow.", detail: "Details about maintenance.", time: "2 hours ago", read: false },
      { id: 2, title: "System upgrade successfully completed.", detail: "Details about the upgrade.", time: "1 day ago", read: true },
    ],
    TRAINEE: [
      { id: 3, title: "New account for trainee created.", detail: "Account created successfully.", time: "1 minute ago", read: false },
    ],
    MENTOR: [
      { id: 4, title: "New account for mentor created.", detail: "Account created successfully.", time: "1 minute ago", read: false },
    ],
  });

  const [activeCategory, setActiveCategory] = useState<string>("SYSTEM");
  const [filter, setFilter] = useState<string>("all");
  const [selectedNotification, setSelectedNotification] = useState<null | { id: number; title: string; detail: string; time: string; read: boolean }>(null);

  const markAllAsRead = () => {
    setNotifications((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map((notif) => ({ ...notif, read: true })),
    }));
  };

  const filteredNotifications = () => {
    const currentNotifications = notifications[activeCategory];
    switch (filter) {
      case "newest":
        return [...currentNotifications].sort((a, b) => a.id - b.id);
      case "latest":
        return [...currentNotifications].sort((a, b) => b.id - a.id);
      case "unread":
        return currentNotifications.filter((notif) => !notif.read);
      case "read":
        return currentNotifications.filter((notif) => notif.read);
      default:
        return currentNotifications;
    }
  };

  const openNotification = (notificationId: number) => {
    const notification = notifications[activeCategory].find((notif) => notif.id === notificationId);
    if (notification) {
      setSelectedNotification(notification);
      setNotifications((prev) => ({
        ...prev,
        [activeCategory]: prev[activeCategory].map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        ),
      }));
    }
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="bg-[#B5B4B4] min-h-screen overflow-hidden md:px-44 lg:px-10 xl:px-56">
      <MainLayout />
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed top-[63px] border border-black left-0 w-64 h-screen bg-[#B5B4B4] text-white flex flex-col p-4 space-y-4">
          <h2 className="text-[35px] font-extrabold text-black">Notification</h2>
          <div className="flex flex-col space-y-2">
            {["SYSTEM", "TRAINEE", "MENTOR"].map((category) => (
              <button
                key={category}
                className={`border border-black text-black p-2 text-center font-semibold ${
                  activeCategory === category ? "bg-gray-200" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 mt-[63px] p-4 w-full">
          <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
  {/* Ikon Filter */}
  <Filter className="w-5 h-5 text-gray-600" />
  {/* Dropdown Tanpa Border */}
  <select
    className="outline-none bg-transparent text-gray-700 p-2"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="all">All</option>
    <option value="newest">Newest</option>
    <option value="latest">Latest</option>
    <option value="unread">Unread</option>
    <option value="read">Read</option>
  </select>
</div>


            <button onClick={markAllAsRead} className="text-black">
              Mark All as Read
            </button>
          </div>
          <div className="space-y-4">
  {filteredNotifications().map((notification) => (
    <div
      key={notification.id}
      onClick={() => openNotification(notification.id)}
      className={`cursor-pointer p-4 rounded-lg flex items-center space-x-4 ${
        notification.read ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      {notification.read ? (
        <MailOpen className="h-6 w-6 text-blue-600" />
      ) : (
        <Mail className="h-6 w-6 text-gray-600" />
      )}
      <div>
        <p className="font-medium text-gray-900">{notification.message}</p>
        <p className="text-sm text-gray-500">{notification.time}</p>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>

      {/* Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">{selectedNotification.title}</h2>
            <p className="text-gray-700 mb-4">{selectedNotification.detail}</p>
            <p className="text-sm text-gray-500">{selectedNotification.time}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
