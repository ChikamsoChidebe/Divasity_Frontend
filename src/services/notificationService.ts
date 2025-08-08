import { apiService } from './api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'investment' | 'project';
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  investmentUpdates: boolean;
  projectUpdates: boolean;
  marketingEmails: boolean;
}

class NotificationService {
  // Get user notifications
  async getUserNotifications(userId: string, page = 1, limit = 20): Promise<{ notifications: Notification[]; total: number; unreadCount: number }> {
    try {
      const response = await apiService.get<{ data: { notifications: Notification[]; total: number; unreadCount: number } }>(
        `/notifications/user/${userId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    try {
      await apiService.patch(`/notifications/${notificationId}/read`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId: string): Promise<void> {
    try {
      await apiService.patch(`/notifications/user/${userId}/read-all`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await apiService.delete(`/notifications/${notificationId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete notification');
    }
  }

  // Get notification settings
  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    try {
      const response = await apiService.get<{ data: NotificationSettings }>(`/notifications/settings/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notification settings');
    }
  }

  // Update notification settings
  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    try {
      const response = await apiService.patch<{ data: NotificationSettings }>(`/notifications/settings/${userId}`, settings);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update notification settings');
    }
  }

  // Get unread count
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const response = await apiService.get<{ data: { count: number } }>(`/notifications/user/${userId}/unread-count`);
      return response.data.count;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch unread count');
    }
  }
}

export const notificationService = new NotificationService();