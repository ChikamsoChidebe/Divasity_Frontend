import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, TrendingUp, Shield, Clock, Users } from 'lucide-react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onInvest: (amount: number, rewardId?: string) => void;
}

export function InvestmentModal({ isOpen, onClose, project, onInvest }: InvestmentModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInvest = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    try {
      await onInvest(parseFloat(amount), selectedReward);
      onClose();
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 500, 1000, 2500, 5000];
  const expectedReturn = parseFloat(amount) * 0.15; // 15% expected return

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Invest in {project?.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      ${project?.funding?.raised?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Raised</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((project?.funding?.raised / project?.funding?.goal) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Funded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {project?.funding?.backers}
                    </div>
                    <div className="text-sm text-gray-600">Backers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {project?.funding?.daysLeft}
                    </div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                </div>
              </div>

              {/* Investment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickAmounts.map(quickAmount => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ${quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expected Return */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <span className="font-medium text-green-800">Expected Return</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${expectedReturn.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700">
                    15% estimated annual return on your ${parseFloat(amount).toLocaleString()} investment
                  </div>
                </div>
              )}

              {/* Risk Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Shield className="text-blue-600" size={20} />
                  <div>
                    <div className="font-medium text-blue-800">Risk Level</div>
                    <div className="text-sm text-blue-600">Medium</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <Clock className="text-purple-600" size={20} />
                  <div>
                    <div className="font-medium text-purple-800">Timeline</div>
                    <div className="text-sm text-purple-600">18 months</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                  <Users className="text-orange-600" size={20} />
                  <div>
                    <div className="font-medium text-orange-800">Category</div>
                    <div className="text-sm text-orange-600">{project?.category}</div>
                  </div>
                </div>
              </div>

              {/* Investment Rewards */}
              {project?.rewards && project.rewards.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Choose Your Reward</h3>
                  <div className="space-y-2">
                    {project.rewards.map((reward: any) => (
                      <label
                        key={reward.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedReward === reward.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reward"
                          value={reward.id}
                          checked={selectedReward === reward.id}
                          onChange={(e) => setSelectedReward(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{reward.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{reward.description}</div>
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            ${reward.minAmount}+
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvest}
                  disabled={!amount || parseFloat(amount) <= 0 || loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Invest $${amount || '0'}`}
                </button>
              </div>
              
              <div className="text-xs text-gray-500 mt-3 text-center">
                By investing, you agree to our Terms of Service and acknowledge the risks involved.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}