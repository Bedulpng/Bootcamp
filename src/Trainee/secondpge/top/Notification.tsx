import React, { useState } from "react";
import Navbar from "../layouts/navbar";
import { Bell } from "lucide-react";

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Notification 1", detail: "Notification detail", read: false },
    { id: 2, title: "Notification 2", detail: "Notification detail", read: false },
    { id: 3, title: "Notification 3", detail: "Notification detail", read: true },
  ]);
  const [filter, setFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<null | { id: number; message: string; d}>(null);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const filteredNotifications = () => {
    let sortedNotifications = [...notifications];
    
    switch (filter) {
      case "newest":
        sortedNotifications.sort((a, b) => a.id - b.id);
        break;
      case "latest":
        sortedNotifications.sort((a, b) => b.id - a.id);
        break;
      case "unread":
        return notifications.filter((notif) => !notif.read);
      case "read":
        return notifications.filter((notif) => notif.read);
      default:
        return notifications;
    }

    return sortedNotifications;
  };

  const openNotification = (notification: { id: number; title: string; detail: string; read: boolean }) => {
    setSelectedNotification(notification);
    setShowModal(true);
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === notification.id ? { ...notif, read: true } : notif))
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  return (
    <div className="bg-white min-h-screen overflow-hidden md:px-44 lg:px-10 xl:px-56">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-64 bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-lg font-medium mb-4 text-black">Filter</h2>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Sort By</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sort"
                    value="newest"
                    checked={filter === "newest"}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Newest</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sort"
                    value="latest"
                    checked={filter === "latest"}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Latest</span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sort"
                    value="unread"
                    checked={filter === "unread"}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>UnRead</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sort"
                    value="read"
                    checked={filter === "read"}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>Read</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">Notification</h1>
              <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={markAllAsRead}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Mark all as read
              </label>
            </div>

            <div className="space-y-4">
              {filteredNotifications().map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => openNotification(notification)}
                  className={`cursor-pointer p-4 rounded-lg ${
                    notification.read ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Bell className={`h-6 w-6 ${notification.read ? "text-blue-600" : "text-gray-600"}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-gray-600">{notification.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg text-black font-bold mb-4">{selectedNotification.title}</h2>
            <p className="text-gray-700">{selectedNotification.detail}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
