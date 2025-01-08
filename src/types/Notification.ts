export interface Notification {
  id: number;
  message: string;
  description: string;
  isRead: boolean;
  icon: string;
  createdAt: Date;
}