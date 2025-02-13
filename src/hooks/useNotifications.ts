import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fixed import: jwtDecode is default export
import { Notification } from '@/types/Notification';

export function useNotifications(initialNotifications: Notification[] = []) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [, setSocket] = useState<any>(null);

  // Fetch initial notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.get('http://192.168.1.7:4000/mentor/notifications', {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Add Authorization header
          },
        }); // Replace with your API endpoint
        const unreadNotifications = response.data.notifications.filter((notif: Notification) => !notif.isRead);
        setNotifications(unreadNotifications); // Only set unread notifications
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    const refreshToken = localStorage.getItem('refreshToken')!;
    const decodedToken = jwtDecode<{ id: string }>(refreshToken);

    // Set up Socket.IO connection using WebSocket only
    const socket = io('http://192.168.1.7:4000', {
      transports: ['websocket'], // Force WebSocket transport
    }); // Replace with your backend's WebSocket URL

    // Listen for connection
    socket.on('connect', () => {
      console.log('Connected to the server via WebSocket!');

      // Join a specific room (example: userId room)
      socket.emit('joinRoom', decodedToken.id);
    });

    setSocket(socket);

    // Listen for real-time notifications
    socket.on('receiveNotification', (newNotification: Notification) => {
      console.log('Notification received:', newNotification);
      if (!newNotification.isRead) {
        setNotifications((prev) => [newNotification, ...prev]);
      }
    });

    // Clean up WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await axios.put(`http://192.168.1.7:4000/mentor/notification/${id}/read`);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const token = localStorage.getItem('refreshToken'); // Retrieve JWT token from local storage
      if (!token) throw new Error('Token not found');
        const decodedToken: any = jwtDecode(token as string);
        const mentorId = decodedToken.id;

      await axios.put('http://192.168.1.7:4000/mentor/notifications/read-all');

      setNotifications((prev) =>
        prev.filter((notif) => notif.userId !== mentorId) // Remove all unread notifications
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, []);

  const unreadCount = notifications.length;

  return { notifications, removeNotification, markAsRead, markAllAsRead, unreadCount };
}
