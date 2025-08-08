import { apiService } from './api';

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: 'active' | 'suspended' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return' | 'fee';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  reference?: string;
}

export interface DepositData {
  amount: number;
  paymentMethod: string;
  reference?: string;
}

export interface WithdrawalData {
  amount: number;
  bankAccount: string;
  description?: string;
}

class WalletService {
  // Get user wallet
  async getUserWallet(userId: string): Promise<Wallet> {
    try {
      const response = await apiService.get<{ data: Wallet }>(`/wallet/user/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch wallet');
    }
  }

  // Create wallet for user
  async createWallet(userId: string): Promise<Wallet> {
    try {
      const response = await apiService.post<{ data: Wallet }>('/wallet/create', { userId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create wallet');
    }
  }

  // Get wallet transactions
  async getTransactions(walletId: string, page = 1, limit = 20): Promise<{ transactions: Transaction[]; total: number }> {
    try {
      const response = await apiService.get<{ data: { transactions: Transaction[]; total: number } }>(
        `/wallet/${walletId}/transactions?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
    }
  }

  // Deposit funds
  async deposit(walletId: string, data: DepositData): Promise<Transaction> {
    try {
      const response = await apiService.post<{ data: Transaction }>(`/wallet/${walletId}/deposit`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to deposit funds');
    }
  }

  // Withdraw funds
  async withdraw(walletId: string, data: WithdrawalData): Promise<Transaction> {
    try {
      const response = await apiService.post<{ data: Transaction }>(`/wallet/${walletId}/withdraw`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to withdraw funds');
    }
  }

  // Get transaction by ID
  async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const response = await apiService.get<{ data: Transaction }>(`/wallet/transaction/${transactionId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch transaction');
    }
  }

  // Get wallet balance
  async getBalance(walletId: string): Promise<{ balance: number; currency: string }> {
    try {
      const response = await apiService.get<{ data: { balance: number; currency: string } }>(`/wallet/${walletId}/balance`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch balance');
    }
  }
}

export const walletService = new WalletService();