export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  description: string;
  isRead: boolean;
  icon: string;
  createdAt: Date;
  type: string;
}