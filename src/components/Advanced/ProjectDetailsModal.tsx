import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, TrendingUp, Heart, Share2, Bookmark, Play } from 'lucide-react';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onInvest: () => void;
}

export function ProjectDetailsModal({ isOpen, onClose, project, onInvest }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'updates', name: 'Updates' },
    { id: 'team', name: 'Team' },
    { id: 'financials', name: 'Financials' }
  ];

  const progressPercentage = Math.round((project?.funding?.raised / project?.funding?.goal) * 100) || 0;

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
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <div className="h-64 overflow-hidden">
                <img 
                  src={project?.image} 
                  alt={project?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">{project?.title}</h1>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{project?.location || 'Global'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(project?.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{project?.funding?.backers} backers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                        isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                        isBookmarked ? 'bg-purple-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto max-h-[60vh]">
                {/* Tabs */}
                <div className="border-b border-gray-200 px-6">
                  <div className="flex space-x-8">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                        <p className="text-gray-600 leading-relaxed">{project?.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Innovative technology with proven results</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Experienced team with industry expertise</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Strong market demand and growth potential</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Risk Assessment</h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-medium text-yellow-800">Medium Risk</span>
                          </div>
                          <p className="text-sm text-yellow-700">
                            This investment carries moderate risk due to market volatility and regulatory factors.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="space-y-4">
                      {project?.updates?.map((update: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{update.title}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(update.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{update.content}</p>
                        </div>
                      )) || (
                        <div className="text-center py-8 text-gray-500">
                          No updates available yet.
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'team' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project?.team?.map((member: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                      )) || (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          Team information not available.
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'financials' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-600">
                            ${project?.funding?.goal?.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-700">Funding Goal</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-600">15-25%</div>
                          <div className="text-sm text-green-700">Expected Return</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Use of Funds</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Research & Development</span>
                            <span className="font-medium">40%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Marketing & Sales</span>
                            <span className="font-medium">30%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Operations</span>
                            <span className="font-medium">20%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Legal & Compliance</span>
                            <span className="font-medium">10%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
                <div className="space-y-6">
                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${project?.funding?.raised?.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        of ${project?.funding?.goal?.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{progressPercentage}%</div>
                        <div className="text-gray-500">Funded</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{project?.funding?.daysLeft}</div>
                        <div className="text-gray-500">Days Left</div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Button */}
                  <button
                    onClick={onInvest}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
                  >
                    Invest Now
                  </button>

                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{project?.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-medium text-yellow-600">Medium</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Timeline</span>
                      <span className="font-medium">18 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Min. Investment</span>
                      <span className="font-medium">$100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}