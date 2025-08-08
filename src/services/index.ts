// Export all services from a central location
export { authService } from './authService';
export { projectService } from './projectService';
export { investmentService } from './investmentService';
export { walletService } from './walletService';
export { notificationService } from './notificationService';
export { communityService } from './communityService';
export { analyticsService } from './analyticsService';
export { apiService } from './api';

// Export types
export type { LoginCredentials, RegisterData, AuthResponse } from './authService';
export type { Project, Investment, ProjectFilters } from './projectService';
export type { Investment as InvestmentType, InvestmentData } from './investmentService';
export type { Wallet, Transaction } from './walletService';
export type { Notification, NotificationSettings } from './notificationService';
export type { Post, Comment, CreatePostData } from './communityService';
export type { DashboardStats, UserAnalytics, ProjectAnalytics } from './analyticsService';