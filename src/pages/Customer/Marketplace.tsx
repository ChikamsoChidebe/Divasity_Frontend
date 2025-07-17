import { useState } from "react";
import { TabHeader } from "../../components/Header/TabHeader";
import { Search } from "lucide-react";
import { images } from "../../constants";
import { motion } from "framer-motion";

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "GreenTech Solutions",
      category: "Clean Energy",
      image: images.TechProject,
      description:
        "Innovative solar panel technology with 30% higher efficiency than market standards.",
      funding: {
        raised: 45000,
        goal: 75000,
        backers: 128,
        daysLeft: 18,
      },
      tags: ["Sustainable", "Technology", "Growth"],
      featured: true,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Urban Farming Initiative",
      category: "Agriculture",
      image: images.FarmingPost,
      description:
        "Vertical farming solution for urban areas to grow organic produce locally.",
      funding: {
        raised: 28500,
        goal: 50000,
        backers: 95,
        daysLeft: 24,
      },
      tags: ["Sustainable", "Community", "Food"],
      featured: false,
      rating: 4.5,
    },
    {
      id: "3",
      title: "MediHealth App",
      category: "Healthcare",
      image: images.BusinessProject,
      description:
        "AI-powered healthcare app for remote diagnostics and patient monitoring.",
      funding: {
        raised: 62000,
        goal: 100000,
        backers: 215,
        daysLeft: 12,
      },
      tags: ["Healthcare", "Technology", "AI"],
      featured: true,
      rating: 4.9,
    },
  ]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "clean-energy", name: "Clean Energy" },
    { id: "agriculture", name: "Agriculture" },
    { id: "healthcare", name: "Healthcare" },
    { id: "education", name: "Education" },
    { id: "technology", name: "Technology" },
  ];

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

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      project.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden">
        <TabHeader
          name="Marketplace"
          containerStyle="flex-row-reverse bg-white/95 backdrop-blur-md border-b border-gray-200"
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
              alt="Marketplace background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Innovative Projects
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mb-6">
              Explore and invest in groundbreaking projects that align with your
              values and financial goals.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-transparent bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Search for projects..."
              />
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8 overflow-x-auto pb-2 hide-scrollbar"
          variants={itemVariants}
        >
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-purple-600 text-sm font-bold px-2 py-1 rounded-md flex items-center">
                  ★ {project.rating}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {project.title}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      ${project.funding.raised.toLocaleString()} raised
                    </span>
                    <span className="font-medium text-gray-900">
                      {Math.round(
                        (project.funding.raised / project.funding.goal) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (project.funding.raised / project.funding.goal) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{project.funding.backers} backers</span>
                    <span>{project.funding.daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}