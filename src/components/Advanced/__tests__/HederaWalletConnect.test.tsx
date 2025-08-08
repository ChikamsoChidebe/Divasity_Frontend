import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HederaWalletConnect } from '../HederaWalletConnect';

// Mock the Hedera wallet service
jest.mock('../../../services/hederaWalletService', () => ({
  hederaWalletService: {
    connectWallet: jest.fn(),
    disconnectWallet: jest.fn(),
    getStoredWalletData: jest.fn(),
    getAccountBalance: jest.fn(),
  }
}));

// Mock window.hashconnect
Object.defineProperty(window, 'hashconnect', {
  value: {
    connectToLocalWallet: jest.fn(),
  },
  writable: true,
});

describe('HederaWalletConnect', () => {
  const mockOnConnect = jest.fn();
  const mockOnDisconnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders connect button when wallet is not connected', () => {
    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    expect(screen.getByText('Connect Hedera Wallet')).toBeInTheDocument();
    expect(screen.getByText('Connect your Hedera wallet to access your HBAR and tokens')).toBeInTheDocument();
  });

  it('shows loading state when connecting', async () => {
    const { hederaWalletService } = require('../../../services/hederaWalletService');
    hederaWalletService.connectWallet.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    const connectButton = screen.getByText('Connect Hedera Wallet');
    fireEvent.click(connectButton);

    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  it('displays connected state with account information', async () => {
    const mockWalletData = {
      accountId: '0.0.123456',
      network: 'testnet',
      balance: 10.5
    };

    const { hederaWalletService } = require('../../../services/hederaWalletService');
    hederaWalletService.getStoredWalletData.mockReturnValue(mockWalletData);
    hederaWalletService.getAccountBalance.mockResolvedValue(10.5);

    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.getByText('0.0.123456')).toBeInTheDocument();
      expect(screen.getByText('10.50 HBAR')).toBeInTheDocument();
      expect(screen.getByText('testnet')).toBeInTheDocument();
    });
  });

  it('handles connection errors gracefully', async () => {
    const { hederaWalletService } = require('../../../services/hederaWalletService');
    hederaWalletService.connectWallet.mockRejectedValue(
      new Error('HashPack wallet not found')
    );

    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    const connectButton = screen.getByText('Connect Hedera Wallet');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText('HashPack wallet not found')).toBeInTheDocument();
    });
  });

  it('calls onConnect callback when wallet connects successfully', async () => {
    const mockWalletData = {
      accountId: '0.0.123456',
      network: 'testnet',
      balance: 10.5
    };

    const { hederaWalletService } = require('../../../services/hederaWalletService');
    hederaWalletService.connectWallet.mockResolvedValue(mockWalletData);

    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    const connectButton = screen.getByText('Connect Hedera Wallet');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(mockOnConnect).toHaveBeenCalledWith('0.0.123456');
    });
  });

  it('calls onDisconnect callback when wallet disconnects', async () => {
    const mockWalletData = {
      accountId: '0.0.123456',
      network: 'testnet',
      balance: 10.5
    };

    const { hederaWalletService } = require('../../../services/hederaWalletService');
    hederaWalletService.getStoredWalletData.mockReturnValue(mockWalletData);
    hederaWalletService.getAccountBalance.mockResolvedValue(10.5);

    render(
      <HederaWalletConnect 
        onConnect={mockOnConnect} 
        onDisconnect={mockOnDisconnect} 
      />
    );

    await waitFor(() => {
      const disconnectButton = screen.getByText('Disconnect');
      fireEvent.click(disconnectButton);
    });

    expect(mockOnDisconnect).toHaveBeenCalled();
  });
});