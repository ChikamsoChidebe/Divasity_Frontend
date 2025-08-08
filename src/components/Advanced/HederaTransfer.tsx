import { useState } from 'react';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { hederaWalletService } from '../../services/hederaWalletService';

interface HederaTransferProps {
  accountId: string;
  balance: number;
  onTransferComplete?: () => void;
}

export function HederaTransfer({ accountId, balance, onTransferComplete }: HederaTransferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (transferAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    // Basic Hedera account ID validation
    if (!/^\d+\.\d+\.\d+$/.test(recipient)) {
      setError('Invalid Hedera account ID format (e.g., 0.0.123456)');
      return;
    }

    setIsTransferring(true);
    setError('');
    setSuccess('');

    try {
      const transactionId = await hederaWalletService.transferHBAR(recipient, transferAmount);
      setSuccess(`Transfer successful! Transaction ID: ${transactionId}`);
      setRecipient('');
      setAmount('');
      onTransferComplete?.();
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Transfer failed');
    } finally {
      setIsTransferring(false);
    }
  };

  const resetForm = () => {
    setRecipient('');
    setAmount('');
    setError('');
    setSuccess('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Send size={20} />
        <span>Send HBAR</span>
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Send className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Send HBAR</h3>
            <p className="text-gray-600 text-sm">Transfer HBAR to another account</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            resetForm();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={20} />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Account ID
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0.0.123456"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (HBAR)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              max={balance}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={() => setAmount(balance.toString())}
                className="text-purple-600 text-sm hover:text-purple-700 transition-colors"
              >
                Max
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Available: {balance.toFixed(2)} HBAR
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={() => {
              setIsOpen(false);
              resetForm();
            }}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleTransfer}
            disabled={isTransferring || !recipient || !amount}
            className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isTransferring ? (
              <>
                <Loader className="animate-spin" size={16} />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Send HBAR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}