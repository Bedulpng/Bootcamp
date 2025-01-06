import { useState, useCallback } from 'react';

export interface Notification {
  id: number;
  message: string;
  description: string;
  isRead: boolean;
  icon: string;
  createdAt: Date;
}

export function useNotifications(initialNotifications: Notification[] = []) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = useCallback((message: string, description: string, icon: string, createdAt: Date) => {
    setNotifications(prev => [
      { id: Date.now(), message, description, isRead: false, icon, createdAt },
      ...prev
    ]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, addNotification, removeNotification, markAsRead, markAllAsRead, unreadCount };
}

