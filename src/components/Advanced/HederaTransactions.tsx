import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { hederaWalletService, HederaTransaction } from '../../services/hederaWalletService';

interface HederaTransactionsProps {
  accountId: string;
}

export function HederaTransactions({ accountId }: HederaTransactionsProps) {
  const [transactions, setTransactions] = useState<HederaTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (accountId) {
      loadTransactions();
    }
  }, [accountId]);

  const loadTransactions = async () => {
    setIsLoading(true);
    setError('');

    try {
      const txHistory = await hederaWalletService.getTransactionHistory(accountId);
      setTransactions(txHistory);
    } catch (err: any) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionIcon = (transaction: HederaTransaction) => {
    const isOutgoing = transaction.from === accountId;
    return isOutgoing ? (
      <ArrowUpRight className="text-red-500" size={20} />
    ) : (
      <ArrowDownLeft className="text-green-500" size={20} />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openInExplorer = (transactionId: string) => {
    const explorerUrl = `https://hashscan.io/testnet/transaction/${transactionId}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Hedera Transactions</h3>
          <p className="text-gray-600 text-sm">Recent HBAR and token transactions</p>
        </div>
        <button
          onClick={loadTransactions}
          disabled={isLoading}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={isLoading ? 'animate-spin' : ''} size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="animate-spin text-purple-600" size={24} />
          <span className="ml-2 text-gray-600">Loading transactions...</span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found</p>
          <p className="text-gray-400 text-sm mt-2">
            Your Hedera transactions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  {getTransactionIcon(transaction)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">
                      {transaction.type === 'transfer' ? 'HBAR Transfer' : 'Token Transfer'}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{formatDate(transaction.timestamp)}</span>
                    {transaction.transactionId && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => openInExplorer(transaction.transactionId!)}
                          className="flex items-center hover:text-purple-600 transition-colors"
                        >
                          <span className="mr-1">View</span>
                          <ExternalLink size={12} />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    {transaction.from === accountId ? `To: ${transaction.to}` : `From: ${transaction.from}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  transaction.from === accountId ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.from === accountId ? '-' : '+'}
                  {transaction.amount} HBAR
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}