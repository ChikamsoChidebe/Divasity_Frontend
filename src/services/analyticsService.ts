import { apiService } from './api';

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalInvestments: number;
  totalFunding: number;
  activeProjects: number;
  completedProjects: number;
  successRate: number;
  monthlyGrowth: number;
}

export interface UserAnalytics {
  totalInvested: number;
  totalReturns: number;
  activeInvestments: number;
  completedInvestments: number;
  portfolioValue: number;
  monthlyGrowth: number;
  riskScore: number;
  diversificationScore: number;
}

export interface ProjectAnalytics {
  views: number;
  likes: number;
  shares: number;
  investments: number;
  totalFunding: number;
  conversionRate: number;
  averageInvestment: number;
  topInvestors: Array<{
    userId: string;
    name: string;
    amount: number;
  }>;
}

export interface MarketTrends {
  topCategories: Array<{
    category: string;
    projectCount: number;
    totalFunding: number;
    growth: number;
  }>;
  investmentTrends: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
  userGrowth: Array<{
    date: string;
    newUsers: number;
    totalUsers: number;
  }>;
}

class AnalyticsService {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiService.get<{ data: DashboardStats }>('/analytics/dashboard');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }

  // Get user analytics
  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    try {
      const response = await apiService.get<{ data: UserAnalytics }>(`/analytics/user/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user analytics');
    }
  }

  // Get project analytics
  async getProjectAnalytics(projectId: string): Promise<ProjectAnalytics> {
    try {
      const response = await apiService.get<{ data: ProjectAnalytics }>(`/analytics/project/${projectId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project analytics');
    }
  }

  // Get market trends
  async getMarketTrends(period = '30d'): Promise<MarketTrends> {
    try {
      const response = await apiService.get<{ data: MarketTrends }>(`/analytics/market-trends?period=${period}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch market trends');
    }
  }

  // Get investment performance
  async getInvestmentPerformance(userId: string, period = '1y'): Promise<Array<{
    date: string;
    value: number;
    returns: number;
    growth: number;
  }>> {
    try {
      const response = await apiService.get<{ data: Array<{
        date: string;
        value: number;
        returns: number;
        growth: number;
      }> }>(`/analytics/investment-performance/${userId}?period=${period}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch investment performance');
    }
  }

  // Get portfolio distribution
  async getPortfolioDistribution(userId: string): Promise<Array<{
    category: string;
    amount: number;
    percentage: number;
    projects: number;
  }>> {
    try {
      const response = await apiService.get<{ data: Array<{
        category: string;
        amount: number;
        percentage: number;
        projects: number;
      }> }>(`/analytics/portfolio-distribution/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch portfolio distribution');
    }
  }

  // Track user activity
  async trackActivity(activity: {
    type: string;
    data?: any;
    timestamp?: string;
  }): Promise<void> {
    try {
      await apiService.post('/analytics/track', {
        ...activity,
        timestamp: activity.timestamp || new Date().toISOString(),
      });
    } catch (error: any) {
      // Don't throw error for tracking failures
      console.warn('Failed to track activity:', error.message);
    }
  }
}

export const analyticsService = new AnalyticsService();