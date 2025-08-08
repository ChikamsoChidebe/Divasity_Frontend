import { apiService } from './api';

export interface Investment {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  investmentDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  returns?: number;
  project?: {
    id: string;
    title: string;
    category: string;
    image?: string;
  };
}

export interface InvestmentData {
  projectId: string;
  amount: number;
  paymentMethod?: string;
}

export interface InvestmentStats {
  totalInvested: number;
  totalReturns: number;
  activeInvestments: number;
  completedInvestments: number;
  averageReturn: number;
}

class InvestmentService {
  // Create new investment
  async createInvestment(data: InvestmentData): Promise<Investment> {
    try {
      const response = await apiService.post<{ data: Investment }>('/investments', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create investment');
    }
  }

  // Get user investments
  async getUserInvestments(userId: string): Promise<Investment[]> {
    try {
      const response = await apiService.get<{ data: Investment[] }>(`/investments/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.warn('Failed to fetch user investments:', error.message);
      return [];
    }
  }

  // Get investment by ID
  async getInvestmentById(id: string): Promise<Investment> {
    try {
      const response = await apiService.get<{ data: Investment }>(`/investments/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch investment');
    }
  }

  // Get investment statistics
  async getInvestmentStats(userId: string): Promise<InvestmentStats> {
    try {
      const response = await apiService.get<{ data: InvestmentStats }>(`/investments/stats/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch investment stats');
    }
  }

  // Cancel investment
  async cancelInvestment(id: string): Promise<void> {
    try {
      await apiService.patch(`/investments/${id}/cancel`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel investment');
    }
  }

  // Get project investments
  async getProjectInvestments(projectId: string): Promise<Investment[]> {
    try {
      const response = await apiService.get<{ data: Investment[] }>(`/investments/project/${projectId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project investments');
    }
  }
}

export const investmentService = new InvestmentService();