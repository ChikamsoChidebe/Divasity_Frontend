import { useState, useEffect } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { Plus, Grid, List, Filter, MoreVertical } from "lucide-react";
import { images } from "../../constants";
import { motion } from "framer-motion";

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [projects] = useState([
    {
      id: "1",
      title: "GreenTech Solutions",
      category: "Clean Energy",
      image: "https://i.pinimg.com/736x/e0/32/0b/e0320b736c26d63b53aeec1fbb7c689a.jpg",
      description: "Innovative solar panel technology with 30% higher efficiency than market standards.",
      status: "active",
      progress: 75,
      funding: {
        raised: 45000,
        goal: 75000,
        backers: 128,
        daysLeft: 18,
      },
      createdAt: "2023-11-10",
    },
    {
      id: "2",
      title: "Urban Farming Initiative",
      category: "Agriculture",
      image: images.FarmingPost,
      description: "Vertical farming solution for urban areas to grow organic produce locally.",
      status: "active",
      progress: 45,
      funding: {
        raised: 28500,
        goal: 50000,
        backers: 95,
        daysLeft: 24,
      },
      createdAt: "2023-12-05",
    },
    {
      id: "3",
      title: "MediHealth App",
      category: "Healthcare",
      image: "https://i.pinimg.com/1200x/53/5c/43/535c438a97e013eb40e0505e72cdd9e8.jpg",
      description: "AI-powered healthcare app for remote diagnostics and patient monitoring.",
      status: "completed",
      progress: 100,
      funding: {
        raised: 100000,
        goal: 100000,
        backers: 215,
        daysLeft: 0,
      },
      createdAt: "2023-10-15",
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: "all", name: "All Projects" },
    { id: "active", name: "Active" },
    { id: "completed", name: "Completed" },
    { id: "draft", name: "Drafts" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:hidden">
        <TabHeader
          name="My Projects"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
        />
      </div>

      <motion.div 
        className="pt-6 md:pt-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Actions */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Portfolio</h1>
              <p className="text-gray-600 text-lg">Discover and manage your investment opportunities</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span>{filteredProjects.length} projects</span>
                <span>•</span>
                <span>${projects.reduce((sum, p) => sum + (p.funding?.raised || 0), 0).toLocaleString()} total funding</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List size={18} />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="funding">Highest Funding</option>
                <option value="progress">Most Progress</option>
              </select>
              
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium">
                <Plus size={18} />
                Create Project
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </motion.div>

        {/* Quick Filters */}
        <motion.div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2" variants={itemVariants}>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={containerVariants}>
          {filteredProjects.length === 0 ? (
            <motion.div 
              className="bg-white rounded-3xl p-12 text-center border border-gray-200"
              variants={itemVariants}
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <Filter size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a new project</p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create New Project
              </button>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-48">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-600' : 
                        project.status === 'completed' ? 'bg-blue-100 text-blue-600' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">${project.funding.raised.toLocaleString()} raised</span>
                        <span className="font-medium text-gray-900">{Math.round((project.funding.raised / project.funding.goal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${project.status === 'completed' ? 'bg-blue-600' : 'bg-purple-600'}`}
                          style={{ width: `${Math.min((project.funding.raised / project.funding.goal) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.funding.backers} backers</span>
                      <span>{project.status === 'completed' ? 'Completed' : `${project.funding.daysLeft} days left`}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Projects;