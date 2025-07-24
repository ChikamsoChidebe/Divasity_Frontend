import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Star, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { TabHeader } from '../../components/Header/TabHeader';
import { AdvancedSearch } from '../../components/Advanced/AdvancedSearch';
import { ProjectCard } from '../../components/Advanced/ProjectCard';
import { projectService } from '../../services/projectService';

export function Marketplace() {
  const [projects, setProjects] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [trendingProjects, setTrendingProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects', count: 156 },
    { id: 'technology', name: 'Technology', count: 45 },
    { id: 'healthcare', name: 'Healthcare', count: 32 },
    { id: 'clean-energy', name: 'Clean Energy', count: 28 },
    { id: 'agriculture', name: 'Agriculture', count: 21 },
    { id: 'education', name: 'Education', count: 18 },
    { id: 'finance', name: 'Finance', count: 12 }
  ];

  const sampleProjects = [
    {
      id: '1',
      title: 'Revolutionary Solar Panel Technology',
      description: 'Next-generation solar panels with 40% higher efficiency and 50% lower cost than traditional panels.',
      category: 'Clean Energy',
      image: 'https://i.pinimg.com/736x/e0/32/0b/e0320b736c26d63b53aeec1fbb7c689a.jpg',
      funding: { raised: 125000, goal: 200000, backers: 234 },
      status: 'active',
      location: 'San Francisco, CA',
      featured: true,
      trending: true,
      rating: 4.8,
      riskLevel: 'Medium',
      expectedReturn: '15-25%',
      timeline: '18 months',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'AI-Powered Medical Diagnostics',
      description: 'Advanced AI system for early disease detection with 95% accuracy rate.',
      category: 'Healthcare',
      image: 'https://i.pinimg.com/1200x/53/5c/43/535c438a97e013eb40e0505e72cdd9e8.jpg',
      funding: { raised: 89000, goal: 150000, backers: 156 },
      status: 'active',
      location: 'Boston, MA',
      featured: true,
      rating: 4.9,
      riskLevel: 'High',
      expectedReturn: '20-35%',
      timeline: '24 months',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Vertical Farming Revolution',
      description: 'Sustainable urban farming solution producing 10x more yield in 90% less space.',
      category: 'Agriculture',
      image: 'https://i.pinimg.com/736x/8b/c4/2a/8bc42a5c8f9d3e1f7a6b5c4d3e2f1a0b.jpg',
      funding: { raised: 67000, goal: 100000, backers: 98 },
      status: 'active',
      location: 'Austin, TX',
      trending: true,
      rating: 4.7,
      riskLevel: 'Medium',
      expectedReturn: '12-20%',
      timeline: '12 months',
      createdAt: '2024-01-05'
    }
  ];

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        // In a real app, these would be separate API calls
        setProjects(sampleProjects);
        setFeaturedProjects(sampleProjects.filter(p => p.featured));
        setTrendingProjects(sampleProjects.filter(p => p.trending));
      } catch (error) {
        console.error('Failed to fetch marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceData();
  }, []);

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
  };

  const handleViewProject = (id: string) => {
    console.log('View project:', id);
  };

  const handleInvestProject = (id: string) => {
    console.log('Invest in project:', id);
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().replace(' ', '-') === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name="Marketplace"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
        />
      </div>

      <div className="pt-6 md:pt-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover innovative projects, connect with entrepreneurs, and build your investment portfolio
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">156</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">$2.4M</div>
              <div className="text-sm text-gray-600">Total Funding</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">1,234</div>
              <div className="text-sm text-gray-600">Investors</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Search */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AdvancedSearch 
            onSearch={handleSearch}
            categories={categories.map(c => c.name)}
          />
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 px-2 py-0.5 bg-black/10 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Star className="text-yellow-500" size={24} />
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={handleViewProject}
                  onInvest={handleInvestProject}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Projects */}
        {trendingProjects.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-green-500" size={24} />
                Trending Now
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={handleViewProject}
                  onInvest={handleInvestProject}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Projects' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} projects found
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onView={handleViewProject}
                    onInvest={handleInvestProject}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}