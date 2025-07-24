import { useState, useEffect } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { Search, MoreVertical, Plus, ChevronDown } from "lucide-react";
import { images } from "../../constants";
import { motion } from "framer-motion";
import { projectService } from "../../services/projectService";

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user.id) {
          const userProjects = await projectService.getUserProjects(user.id);
          setProjects(userProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const sampleProjects = [
    {
      id: "1",
      title: "GreenTech Solutions",
      category: "Clean Energy",
      image: images.TechProject,
      description: "Innovative solar panel technology with 30% higher efficiency than market standards.",
      status: "active",
      progress: 75,
      funding: {
        raised: 45000,
        goal: 75000,
        backers: 128,
        daysLeft: 18,
      },
      team: [
        { id: "1", name: "John Doe", role: "Project Lead", avatar: "" },
        { id: "2", name: "Jane Smith", role: "Financial Advisor", avatar: "" },
        { id: "3", name: "Mike Johnson", role: "Technical Lead", avatar: "" },
      ],
      updates: [
        { 
          id: "1", 
          date: "2024-01-15", 
          title: "Prototype Testing Complete", 
          content: "We've successfully completed the testing phase for our prototype with excellent results." 
        },
        { 
          id: "2", 
          date: "2023-12-20", 
          title: "New Partnership Announcement", 
          content: "We're excited to announce our new partnership with SolarTech Industries." 
        }
      ],
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
      team: [
        { id: "4", name: "Sarah Williams", role: "Project Lead", avatar: "" },
        { id: "5", name: "David Brown", role: "Agricultural Expert", avatar: "" },
      ],
      updates: [
        { 
          id: "3", 
          date: "2024-01-10", 
          title: "First Harvest Complete", 
          content: "We're pleased to announce our first successful harvest from the prototype farm." 
        }
      ],
      createdAt: "2023-12-05",
    },
    {
      id: "3",
      title: "MediHealth App",
      category: "Healthcare",
      image: images.BusinessProject,
      description: "AI-powered healthcare app for remote diagnostics and patient monitoring.",
      status: "completed",
      progress: 100,
      funding: {
        raised: 100000,
        goal: 100000,
        backers: 215,
        daysLeft: 0,
      },
      team: [
        { id: "6", name: "Robert Chen", role: "Project Lead", avatar: "" },
        { id: "7", name: "Lisa Johnson", role: "Medical Advisor", avatar: "" },
        { id: "8", name: "Tom Wilson", role: "AI Developer", avatar: "" },
      ],
      updates: [
        { 
          id: "4", 
          date: "2024-01-20", 
          title: "App Launch Successful", 
          content: "We're thrilled to announce that our app has successfully launched on both iOS and Android platforms." 
        },
        { 
          id: "5", 
          date: "2023-12-15", 
          title: "Beta Testing Results", 
          content: "Beta testing has concluded with 95% positive feedback from our test users." 
        }
      ],
      createdAt: "2023-10-15",
    }
  ];

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

  const displayProjects = projects.length > 0 ? projects : sampleProjects;
  
  const filteredProjects = displayProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden">
        <TabHeader
          name="My Projects"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
        />
      </div>

      <motion.div 
        className="pt-24 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Actions */}
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600">Manage and track your investment projects</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
              <ChevronDown size={16} className="mr-2" />
              Sort
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Plus size={16} className="mr-2" />
              New Project
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6" variants={itemVariants}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search projects..."
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div className="space-y-6 mb-12" variants={containerVariants}>
          {filteredProjects.length === 0 ? (
            <motion.div 
              className="bg-white rounded-2xl p-8 text-center border border-gray-200"
              variants={itemVariants}
            >
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            filteredProjects.map(project => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                variants={itemVariants}
              >
                <div 
                  className="flex flex-col md:flex-row cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Project Image */}
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 mr-2">{project.title}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            project.status === 'active' ? 'bg-green-100 text-green-600' : 
                            project.status === 'completed' ? 'bg-blue-100 text-blue-600' : 
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={18} />
                      </button>
                    </div>
                    
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
                      <div className="flex items-center">
                        <span className="mr-4">{project.funding.backers} backers</span>
                        <span>{project.status === 'completed' ? 'Completed' : `${project.funding.daysLeft} days left`}</span>
                      </div>
                      <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {activeProject === project.id && (
                  <div className="border-t border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Team Section */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Project Team</h4>
                        <div className="space-y-3">
                          {project.team.map(member => (
                            <div key={member.id} className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                                ) : (
                                  <span className="text-gray-500 text-sm">{member.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Updates Section */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Recent Updates</h4>
                        <div className="space-y-4">
                          {project.updates.map(update => (
                            <div key={update.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-gray-900">{update.title}</h5>
                                <span className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-gray-600">{update.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Manage Project
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}