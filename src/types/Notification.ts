export interface Notification {
  id: string;
  userId: string;
  message: string;
  description: string;
  isRead: boolean;
  icon: string;
  createdAt: Date;
}