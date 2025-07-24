import { TrendingUp, TrendingDown, DollarSign, Users, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsProps {
  data: {
    totalInvested: number;
    totalReturns: number;
    activeProjects: number;
    successRate: number;
    monthlyGrowth: number;
    portfolioValue: number;
  };
}

export function Analytics({ data }: AnalyticsProps) {
  const metrics = [
    {
      label: 'Total Invested',
      value: `$${data.totalInvested.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      label: 'Portfolio Value',
      value: `$${data.portfolioValue.toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Active Projects',
      value: data.activeProjects.toString(),
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      label: 'Success Rate',
      value: `${data.successRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Award,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${getColorClasses(metric.color)}`}>
              <metric.icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {metric.change}
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}