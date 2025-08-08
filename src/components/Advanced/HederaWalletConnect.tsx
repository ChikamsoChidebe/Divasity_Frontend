import { useState, useEffect } from 'react';
import { Wallet, CheckCircle, AlertCircle, Loader, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { hederaWalletService, HederaWalletData } from '../../services/hederaWalletService';

interface HederaWalletConnectProps {
  onConnect?: (accountId: string) => void;
  onDisconnect?: () => void;
}

export function HederaWalletConnect({ onConnect, onDisconnect }: HederaWalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletData, setWalletData] = useState<HederaWalletData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const storedData = hederaWalletService.getStoredWalletData();
      if (storedData && window.hashconnect) {
        setWalletData(storedData);
        setIsConnected(true);
        
        // Refresh balance
        const balance = await hederaWalletService.getAccountBalance(storedData.accountId);
        const updatedData = { ...storedData, balance };
        setWalletData(updatedData);
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const data = await hederaWalletService.connectWallet();
      setWalletData(data);
      setIsConnected(true);
      onConnect?.(data.accountId);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    hederaWalletService.disconnectWallet();
    setIsConnected(false);
    setWalletData(null);
    setError('');
    onDisconnect?.();
  };

  const formatAccountId = (id: string) => {
    if (!id) return '';
    return `${id.slice(0, 8)}...${id.slice(-6)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Wallet className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hedera Wallet</h3>
            <p className="text-gray-600 text-sm">Connect your Hedera wallet to manage assets</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Connected</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isConnected ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Connected Account</p>
                <p className="font-mono text-sm font-medium text-gray-900">{walletData?.accountId}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {walletData?.accountId && formatAccountId(walletData.accountId)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-lg font-semibold text-gray-900">
                  {walletData?.balance?.toFixed(2) || '0.00'} HBAR
                </p>
                <p className="text-xs text-gray-500">{walletData?.network}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={disconnectWallet}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Disconnect
            </button>
            <button 
              onClick={() => {
                const explorerUrl = walletData?.network === 'mainnet' 
                  ? `https://hashscan.io/mainnet/account/${walletData?.accountId}`
                  : `https://hashscan.io/testnet/account/${walletData?.accountId}`;
                window.open(explorerUrl, '_blank');
              }}
              className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ExternalLink size={16} />
              <span>View on Explorer</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Connect your Hedera wallet to access your HBAR and tokens
          </p>
          
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isConnecting ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wallet size={20} />
                <span>Connect Hedera Wallet</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Make sure you have HashPack or another Hedera wallet extension installed
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    hashconnect?: any;
  }
}