import { motion } from "framer-motion";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the fundamentals of React and build your first application",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Building Responsive Websites",
    excerpt: "Master the art of creating websites that work on all devices",
    date: "2023-12-10",
    readTime: "7 min read",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80"
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    excerpt: "Write clean and maintainable JavaScript code",
    date: "2023-12-05",
    readTime: "6 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const categories = ["All", "Web Development", "UI/UX", "Programming"];

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredPost, setHoveredPost] = useState(null);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Section>
      <motion.div 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        whileInView={"visible"}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Blog</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPost === post.id ? 1 : 0.5 }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-indigo-400 text-sm">{post.category}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <motion.button
                  className="text-indigo-400 font-medium hover:text-indigo-300"
                  whileHover={{ x: 5 }}
                >
                  Read More →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}; 