import { useState } from 'react';
import { Play, Code, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export function HederaDemo() {
  const [activeDemo, setActiveDemo] = useState<'connect' | 'transfer' | 'history' | null>(null);

  const demos = [
    {
      id: 'connect' as const,
      title: 'Wallet Connection',
      description: 'Connect to HashPack wallet and display account information',
      code: `// Connect to Hedera wallet
const walletData = await hederaWalletService.connectWallet();
console.log('Connected:', walletData.accountId);
console.log('Balance:', walletData.balance, 'HBAR');`,
      steps: [
        'Click "Connect Hedera Wallet"',
        'Approve connection in HashPack',
        'View account ID and balance',
        'Connection persisted in localStorage'
      ]
    },
    {
      id: 'transfer' as const,
      title: 'HBAR Transfer',
      description: 'Send HBAR to another Hedera account',
      code: `// Transfer HBAR
const txId = await hederaWalletService.transferHBAR(
  '0.0.123456', // recipient
  10.5         // amount in HBAR
);
console.log('Transaction ID:', txId);`,
      steps: [
        'Enter recipient account ID',
        'Specify HBAR amount',
        'Click "Send HBAR"',
        'Approve transaction in HashPack',
        'Transaction submitted to network'
      ]
    },
    {
      id: 'history' as const,
      title: 'Transaction History',
      description: 'View recent HBAR transactions',
      code: `// Get transaction history
const transactions = await hederaWalletService
  .getTransactionHistory(accountId);
  
transactions.forEach(tx => {
  console.log(\`\${tx.type}: \${tx.amount} HBAR\`);
});`,
      steps: [
        'Fetch transactions from Hedera Mirror Node',
        'Display transaction list with status',
        'Show transaction details',
        'Link to Hedera explorer'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Hedera Integration Demo</h3>
        <p className="text-gray-600">
          Interactive examples showing how the Hedera wallet integration works
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <div
            key={demo.id}
            className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 ${
              activeDemo === demo.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{demo.title}</h4>
              <Play className="text-purple-600" size={20} />
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
            
            <div className="flex items-center space-x-2 text-sm text-purple-600">
              <Eye size={16} />
              <span>Click to view details</span>
            </div>
          </div>
        ))}
      </div>

      {activeDemo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-8 border-t pt-8"
        >
          {(() => {
            const demo = demos.find(d => d.id === activeDemo)!;
            return (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="text-purple-600" size={20} />
                    <h5 className="text-lg font-semibold text-gray-900">Code Example</h5>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{demo.code}</code>
                  </pre>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Play className="text-purple-600" size={20} />
                    <h5 className="text-lg font-semibold text-gray-900">How it Works</h5>
                  </div>
                  <ol className="space-y-2">
                    {demo.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      <div className="mt-8 p-6 bg-blue-50 rounded-xl">
        <h5 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h5>
        <p className="text-blue-800 mb-4">
          To use the Hedera wallet integration, users need to install the HashPack browser extension 
          and create a Hedera account.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Install HashPack
          </a>
          <a
            href="https://docs.hedera.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            Hedera Docs
          </a>
          <a
            href="https://hashscan.io/testnet"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            Hedera Explorer
          </a>
        </div>
      </div>
    </motion.div>
  );
}