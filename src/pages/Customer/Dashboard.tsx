import { useState, useEffect } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { images } from "../../constants";
import { User, ChevronRight, ArrowRight, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { projectService } from "../../services/projectService";
import { authService } from "../../services/authService";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: "Total Invested", value: "$0", change: "+0%", trend: "up" },
    { label: "Active Projects", value: "0", change: "+0", trend: "up" },
    { label: "Total Returns", value: "$0", change: "+0%", trend: "up" },
    { label: "Success Rate", value: "0%", change: "+0%", trend: "up" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user.id) {
          const [userProjects, userInvestments] = await Promise.all([
            projectService.getUserProjects(user.id),
            projectService.getUserInvestments(user.id)
          ]);
          
          setProjects(userProjects);
          setInvestments(userInvestments);
          
          const totalInvested = userInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0);
          const activeProjects = userProjects.filter((p: any) => p.status === 'active').length;
          
          setStats([
            { label: "Total Invested", value: `$${totalInvested.toLocaleString()}`, change: "+12.5%", trend: "up" },
            { label: "Active Projects", value: activeProjects.toString(), change: "+3", trend: "up" },
            { label: "Total Returns", value: "$0", change: "+0%", trend: "up" },
            { label: "Success Rate", value: "0%", change: "+0%", trend: "up" },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const recentProjects = projects.slice(0, 3).map(project => ({
    id: project.id,
    name: project.title,
    category: project.category,
    amount: project.currentFunding || 0,
    date: project.createdAt,
    status: project.status,
    progress: Math.round((project.currentFunding / project.fundingGoal) * 100),
  }));

  const upcomingPayments = investments.slice(0, 2).map(investment => ({
    id: investment.id,
    project: investment.project?.title || 'Unknown Project',
    amount: investment.amount * 0.15,
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden">
        <TabHeader
          name="Dashboard"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
          icon={<User className="text-gray-600 hover:text-purple-600 transition-colors" />}
        />
      </div>

      <motion.div
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl overflow-hidden shadow-xl relative"
          variants={itemVariants}
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src={images.DashboardHero}
              alt="Dashboard background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Your Investment Dashboard
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mb-6">
              Track your investments, monitor returns, and discover new
              opportunities all in one place.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Explore New Projects
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Projects
              </h2>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600">{project.category}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        project.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {project.status === "active" ? "Active" : "Completed"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>${project.amount.toLocaleString()}</span>
                    <span>
                      {new Date(project.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Upcoming Payments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Upcoming Payments
              </h2>

              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <DollarSign size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {payment.project}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      ${payment.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Performance
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Returns</span>
                  <div className="flex items-center">
                    <TrendingUp
                      size={16}
                      className="text-green-500 mr-1"
                    />
                    <span className="text-sm font-medium text-green-600">
                      +8.2%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Yearly Growth</span>
                  <div className="flex items-center">
                    <TrendingUp
                      size={16}
                      className="text-green-500 mr-1"
                    />
                    <span className="text-sm font-medium text-green-600">
                      +24.5%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Portfolio Diversity
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    High
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Add default export
export default Dashboard;