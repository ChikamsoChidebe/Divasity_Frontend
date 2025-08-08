import { AccountId, Client, Hbar, TransferTransaction } from '@hashgraph/sdk';

export interface HederaWalletData {
  accountId: string;
  network: string;
  balance?: number;
}

export interface HederaTransaction {
  id: string;
  type: 'transfer' | 'token_transfer';
  amount: number;
  from: string;
  to: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  transactionId?: string;
}

class HederaWalletService {
  private client: Client | null = null;
  private accountId: string | null = null;

  async connectWallet(): Promise<HederaWalletData> {
    try {
      // Check if HashPack is available
      if (!window.hashconnect) {
        throw new Error('HashPack wallet extension not found. Please install HashPack.');
      }

      // Initialize connection
      const hashconnect = window.hashconnect;
      const connectionData = await hashconnect.connectToLocalWallet();

      if (!connectionData || !connectionData.accountIds || connectionData.accountIds.length === 0) {
        throw new Error('No accounts found in wallet');
      }

      const primaryAccountId = connectionData.accountIds[0];
      const network = connectionData.network || 'testnet';

      // Initialize Hedera client
      this.client = network === 'mainnet' 
        ? Client.forMainnet()
        : Client.forTestnet();

      this.accountId = primaryAccountId;

      // Get account balance
      const balance = await this.getAccountBalance(primaryAccountId);

      const walletData: HederaWalletData = {
        accountId: primaryAccountId,
        network,
        balance
      };

      // Store in localStorage
      localStorage.setItem('hedera-wallet-data', JSON.stringify(walletData));

      return walletData;
    } catch (error: any) {
      console.error('Hedera wallet connection error:', error);
      throw new Error(error.message || 'Failed to connect to Hedera wallet');
    }
  }

  async getAccountBalance(accountId: string): Promise<number> {
    try {
      if (!this.client) {
        throw new Error('Hedera client not initialized');
      }

      const balance = await this.client.getAccountBalance(AccountId.fromString(accountId));
      return balance.hbars.toTinybars().toNumber() / 100000000; // Convert from tinybars to HBAR
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return 0;
    }
  }

  async transferHBAR(toAccountId: string, amount: number): Promise<string> {
    try {
      if (!this.client || !this.accountId) {
        throw new Error('Wallet not connected');
      }

      if (!window.hashconnect) {
        throw new Error('HashPack not available');
      }

      const transferTransaction = new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(this.accountId), Hbar.fromTinybars(-amount * 100000000))
        .addHbarTransfer(AccountId.fromString(toAccountId), Hbar.fromTinybars(amount * 100000000));

      // Sign and execute transaction through HashPack
      const hashconnect = window.hashconnect;
      const signedTransaction = await hashconnect.signTransaction(transferTransaction);
      const response = await this.client.execute(signedTransaction);
      
      return response.transactionId.toString();
    } catch (error: any) {
      console.error('Transfer error:', error);
      throw new Error(error.message || 'Transfer failed');
    }
  }

  async getTransactionHistory(accountId: string): Promise<HederaTransaction[]> {
    try {
      // This would typically call Hedera Mirror Node API
      // For now, return mock data
      return [
        {
          id: '1',
          type: 'transfer',
          amount: 10,
          from: accountId,
          to: '0.0.123456',
          status: 'success',
          timestamp: new Date().toISOString(),
          transactionId: '0.0.123@1234567890.123456789'
        }
      ];
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  disconnectWallet(): void {
    this.client = null;
    this.accountId = null;
    localStorage.removeItem('hedera-wallet-data');
  }

  getStoredWalletData(): HederaWalletData | null {
    try {
      const stored = localStorage.getItem('hedera-wallet-data');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading stored wallet data:', error);
      return null;
    }
  }

  isConnected(): boolean {
    return this.accountId !== null && this.client !== null;
  }

  getAccountId(): string | null {
    return this.accountId;
  }
}

export const hederaWalletService = new HederaWalletService();

// Extend window interface for HashConnect
declare global {
  interface Window {
    hashconnect?: any;
  }
}