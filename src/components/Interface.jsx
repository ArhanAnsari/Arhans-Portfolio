import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import axios from "axios";

const Section = (props) => {
  const { children, mobileTop, className = "" } = props;

  return (
    <motion.section
      className={`
        relative min-h-screen w-full section-padding
        flex flex-col items-center
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
        ${className}
      `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.3,
        },
      }}
      viewport={{ once: true }}
    >
      {/* Section background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/10 to-transparent -z-10" />
      {children}
    </motion.section>
  );
};

// Enhanced data with modern structure
const testimonials = [
  {
    name: "Clystra Networks Pvt. Ltd.",
    role: "Technology Partner",
    content: "Arhan's expertise in full-stack development and innovative approach to 3D web experiences helped us create exceptional digital solutions. His attention to detail and ability to translate complex requirements into elegant implementations is truly remarkable.",
    image: "/testimonials/clystra-logo.png",
    rating: 5,
    project: "Enterprise Web Platform"
  },
];

const currentWork = {
  title: "Open for New Opportunities",
  description: "I'm actively seeking exciting projects that push the boundaries of web development. Whether it's creating immersive 3D experiences, building scalable applications, or crafting innovative digital solutions.",
  progress: 0,
  technologies: ["React", "Three.js", "Node.js", "Next.js"],
  startDate: "Present",
  status: "Available"
};

const achievements = {
  projectsCompleted: 250,
  yearsOfExperience: 3,
  clientSatisfaction: 10,
  githubContributions: 1869,
  technologiesMastered: 20,
  awards: 5
};

const education = {
  current: {
    school: "Shri Rajendra High School",
    grade: "10th Class",
    year: "2025-2026",
    achievements: [
      "🥇 Academic Excellence Award",
      "🥇 Math Olympiad Gold Medalist", 
      "🥇 Science Olympiad Gold Medalist",
      "💻 Programming Club President",
      "🎨 Digital Art Competition Winner"
    ]
  }
};

const certifications = [
  {
    title: "Advanced React Development",
    issuer: "Meta",
    date: "2024",
    link: "#",
    badge: "🏆"
  },
  {
    title: "Three.js & WebGL Mastery",
    issuer: "Bruno Simon",
    date: "2024",
    link: "#",
    badge: "🎮"
  },
  {
    title: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2023",
    link: "#",
    badge: "💻"
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google",
    date: "2023",
    link: "#",
    badge: "🎨"
  }
];

const services = [
  {
    title: "3D Web Experiences",
    description: "Immersive websites with Three.js and WebGL",
    icon: "🌐",
    technologies: ["Three.js", "React Three Fiber", "WebGL"],
    price: "Premium"
  },
  {
    title: "Full Stack Development", 
    description: "Complete web applications from frontend to backend",
    icon: "⚡",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    price: "Competitive"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces",
    icon: "🎨", 
    technologies: ["Figma", "Adobe XD", "Framer"],
    price: "Affordable"
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications", 
    icon: "📱",
    technologies: ["React Native", "Flutter", "Expo"],
    price: "Standard"
  }
];

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-full relative interface-content">
      {/* Enhanced Background Coverage */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 -z-50" style={{ pointerEvents: 'none' }} />
      <div className="fixed inset-0 hero-pattern opacity-30 -z-40" style={{ pointerEvents: 'none' }} />
      
      {/* Floating particles background */}
      <div className="particles-container" style={{ pointerEvents: 'none' }}>
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent-400 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce-subtle opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-accent-300 rounded-full animate-float opacity-30"></div>
      </div>
      
      {/* Main Content with proper spacing for 3D character */}
      <div className="w-full relative z-20">
        <AboutSection setSection={setSection} />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <AchievementsSection />
        <CurrentWorkSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop className="relative overflow-hidden">
      {/* Logo */}
      <motion.div 
        className="absolute top-8 left-8 z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img 
          src="/logo.png" 
          alt="Arhan Ansari Logo" 
          className="w-16 h-16 object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="flex flex-col items-start justify-center h-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-responsive-xl font-display font-bold leading-tight">
            <span className="block text-neutral-100">Hi, I'm</span>
            <span className="block text-gradient animate-gradient-x bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 bg-clip-text text-transparent">
              Arhan Ansari
            </span>
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30">
              Full Stack Developer
            </span>
            <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm font-medium border border-accent-500/30">
              3D Artist
            </span>
            <span className="px-3 py-1 bg-neutral-600/20 text-neutral-300 rounded-full text-sm font-medium border border-neutral-600/30">
              Student
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="space-y-4 max-w-2xl"
        >
          <p className="text-responsive-base text-neutral-300 leading-relaxed">
            Crafting the <span className="text-primary-400 font-semibold">future of web development</span> through 
            innovative 3D experiences and cutting-edge technologies. Currently mastering the art of 
            <span className="text-accent-400 font-semibold"> immersive digital solutions</span> while 
            excelling in my studies at Shri Rajendra High School.
          </p>
          
          <p className="text-lg text-neutral-400 leading-relaxed">
            Specializing in <span className="text-primary-300">React</span>, 
            <span className="text-accent-300"> Three.js</span>, and 
            <span className="text-primary-300"> modern web technologies</span> to create 
            experiences that inspire and engage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <button
            onClick={() => setSection(8)}
            className="btn-primary group"
          >
            <span>Let's Collaborate</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          
          <button
            onClick={() => setSection(2)}
            className="btn-secondary group"
          >
            <span>View Projects</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex items-center space-x-8 pt-8 border-t border-neutral-800/50"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{achievements.projectsCompleted}+</div>
            <div className="text-sm text-neutral-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-400">{achievements.yearsOfExperience}+</div>
            <div className="text-sm text-neutral-500">Years</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{achievements.technologiesMastered}+</div>
            <div className="text-sm text-neutral-500">Technologies</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-accent-500/10 to-primary-500/10 rounded-full blur-2xl"></div>
    </Section>
  );
};

const skills = [
  {
    title: "Three.js / React Three Fiber",
    description: "Building immersive 3D web experiences",
    years: "2+ years",
    projects: "15+ projects",
    icon: "🎮",
    category: "3D Development",
    technologies: ["Three.js", "React Three Fiber", "WebGL", "Blender"]
  },
  {
    title: "Frontend Development",
    description: "Modern React applications with TypeScript",
    years: "3+ years",
    projects: "50+ projects",
    icon: "⚛️",
    category: "Frontend",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Backend Development", 
    description: "RESTful APIs and real-time applications",
    years: "2+ years",
    projects: "30+ projects",
    icon: "🚀",
    category: "Backend",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"]
  },
  {
    title: "UI/UX Design",
    description: "User-centered design with modern aesthetics",
    years: "2+ years",
    projects: "40+ designs",
    icon: "�",
    category: "Design",
    technologies: ["Figma", "Adobe XD", "Framer", "Sketch"]
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications",
    years: "1+ years",
    projects: "10+ apps",
    icon: "�",
    category: "Mobile",
    technologies: ["React Native", "Flutter", "Expo"]
  },
  {
    title: "DevOps & Deployment",
    description: "CI/CD and cloud infrastructure",
    years: "1+ years",
    projects: "25+ deployments",
    icon: "☁️",
    category: "DevOps",
    technologies: ["Vercel", "Netlify", "AWS", "Docker"]
  }
];

const languages = [
  {
    title: "🇺🇸 English",
    level: 100,
  },
  {
    title: "🇮🇳 Hindi", 
    level: 100,
  },
  {
    title: "🇮🇳 Marathi",
    level: 85,
  },
];

const SkillsSection = () => {
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  return (
    <Section className="bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent">
      <motion.div className="w-full space-y-12" whileInView="visible" viewport={{ once: true }}>
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Constantly evolving my skillset to stay at the forefront of modern web development
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-neutral-200 border-l-4 border-primary-500 pl-4">
                {category}
              </h3>
              
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.title}
                      className="card-modern group hover:border-primary-500/30"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {skill.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold text-neutral-200 group-hover:text-primary-300 transition-colors">
                              {skill.title}
                            </h4>
                            <p className="text-sm text-neutral-400 mt-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {skill.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-primary-500/10 text-primary-300 text-xs rounded-full border border-primary-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">
                          <span className="text-accent-400 font-medium">{skill.years}</span> experience
                        </span>
                        <span className="text-neutral-400">
                          <span className="text-primary-400 font-medium">{skill.projects}</span> completed
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass-morphism rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-neutral-200 mb-6 text-center">
            Languages I Speak
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <motion.div
                key={language.title}
                className="text-center space-y-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-lg font-medium text-neutral-200">
                  {language.title}
                </div>
                <div className="relative h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${language.level}%` }}
                    transition={{ duration: 1.2, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="text-sm text-accent-400 font-medium">
                  {language.level}% Fluency
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from projects
  const categories = ["all", ...new Set(projects.map(p => p.category || "web").filter(Boolean))];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => (p.category || "web") === selectedCategory);

  const displayProjects = filteredProjects.slice(0, visibleProjects);

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
  };

  return (
    <Section className="bg-gradient-to-b from-transparent via-neutral-950/30 to-transparent">
      <motion.div className="w-full space-y-12" whileInView="visible" viewport={{ once: true }}>
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A showcase of my best work, from immersive 3D experiences to full-stack applications.
            Each project represents a unique challenge and innovative solution.
          </motion.p>

          {/* Category Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleProjects(6);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white shadow-glow"
                    : "bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              onClick={() => setCurrentProject(projects.findIndex(p => p.title === project.title))}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              className="btn-secondary"
            >
              Load More Projects ({filteredProjects.length - visibleProjects} remaining)
            </button>
          </motion.div>
        )}

        {/* Project Stats & Breakdown */}
        <motion.div
          className="mt-16 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Stats */}
          <div className="p-8 glass-morphism rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-400">{projects.length}+</div>
                <div className="text-sm text-neutral-400">Total Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent-400">{categories.length - 1}</div>
                <div className="text-sm text-neutral-400">Categories</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary-400">1000+</div>
                <div className="text-sm text-neutral-400">Hours Coded</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent-400">5+</div>
                <div className="text-sm text-neutral-400">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Project Breakdown */}
          <div className="p-8 glass-morphism rounded-2xl">
            <h3 className="text-xl font-bold text-neutral-200 mb-6 text-center">Project Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {projects.filter(p => p.type === 'original').length}
                </div>
                <div className="text-sm text-neutral-400">Original Ideas</div>
                <div className="text-xs text-neutral-500">Built from scratch with my own concepts</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {projects.filter(p => p.type === 'client').length}
                </div>
                <div className="text-sm text-neutral-400">Client Work</div>
                <div className="text-xs text-neutral-500">Real-world projects for businesses</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {projects.filter(p => p.type === 'inspired').length}
                </div>
                <div className="text-sm text-neutral-400">Inspired Recreations</div>
                <div className="text-xs text-neutral-500">My take on existing concepts</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {projects.filter(p => p.type === 'learning').length}
                </div>
                <div className="text-sm text-neutral-400">Learning Projects</div>
                <div className="text-xs text-neutral-500">Tutorial-based for skill development</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <motion.div
      className="card-modern group cursor-pointer overflow-hidden h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden rounded-xl mb-4 bg-neutral-800">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex space-x-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-500/90 text-white rounded-full hover:bg-primary-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-800/90 text-white rounded-full hover:bg-neutral-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary-500/90 text-white text-xs font-medium rounded-full">
            {project.category || "Web"}
          </span>
        </div>

        {/* Project Type Badge */}
        {project.type && (
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.type === 'original' ? 'bg-green-500/90 text-white' :
              project.type === 'inspired' ? 'bg-yellow-500/90 text-white' :
              project.type === 'learning' ? 'bg-blue-500/90 text-white' :
              'bg-purple-500/90 text-white'
            }`}>
              {project.type === 'original' ? '✨ Original' :
               project.type === 'inspired' ? '🎨 Inspired' :
               project.type === 'learning' ? '📚 Learning' :
               '👨‍💼 Client'}
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-neutral-100 group-hover:text-primary-300 transition-colors line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-neutral-800/50 text-neutral-300 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-neutral-700/50 text-neutral-400 text-xs rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <div className="text-center space-y-4 mb-12">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Client Testimonials
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What clients say about working with me
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                    delay: 0.5 + index * 0.2,
                  },
                },
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-lg font-bold text-indigo-500">{testimonial.name}</h3>
                  <p className="text-indigo-400 text-sm md:text-base">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-indigo-400 italic text-sm md:text-base leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const CurrentWorkSection = () => {
  return (
    <Section>
      <motion.div className="w-full max-w-[90vw] md:max-w-[800px]" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-8">Currently Working On</h2>
        <motion.div
          className="bg-white bg-opacity-10 p-6 md:p-8 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            },
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo-500 mb-4">{currentWork.title}</h3>
          <p className="text-indigo-400 text-sm md:text-base mb-6 leading-relaxed">{currentWork.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm md:text-base text-indigo-400 mb-2">
              <span>Progress</span>
              <span>{currentWork.progress}%</span>
            </div>
            <div className="h-2 md:h-3 w-full bg-gray-200 bg-opacity-20 rounded-full">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${currentWork.progress}%` }}
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 1,
                      delay: 1,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {currentWork.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-indigo-500 bg-opacity-20 rounded-full text-indigo-300 text-xs md:text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      delay: 1.2 + index * 0.1,
                    },
                  },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <p className="text-gray-400 text-xs md:text-sm mt-6">Started: {currentWork.startDate}</p>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const EducationSection = () => {
  return (
    <Section className="bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent">
      <motion.div className="w-full space-y-8" whileInView="visible" viewport={{ once: true }}>
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Education & Learning
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Balancing academic excellence with passion for technology and innovation
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Education */}
          <motion.div
            className="card-modern"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-100">Current Education</h3>
                <p className="text-neutral-400 text-sm">Academic Journey</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-neutral-200 mb-1">
                  {education.current.school}
                </h4>
                <p className="text-primary-300 font-medium">{education.current.grade}</p>
                <p className="text-neutral-400 text-sm">{education.current.year}</p>
              </div>

              <div>
                <h5 className="text-neutral-300 font-medium mb-3">Achievements & Recognition</h5>
                <ul className="space-y-2">
                  {education.current.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3 text-neutral-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-accent-400 rounded-full flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="card-modern"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📜</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-100">Certifications</h3>
                <p className="text-neutral-400 text-sm">Professional Development</p>
              </div>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="p-4 bg-neutral-800/30 rounded-xl hover:bg-neutral-700/30 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {cert.badge}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-200 group-hover:text-primary-300 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-neutral-400">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Philosophy */}
        <motion.div
          className="mt-8 p-8 glass-morphism rounded-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-lg text-neutral-300 italic mb-4">
            "Learning is a lifelong journey. Every day brings new opportunities to grow, 
            innovate, and push the boundaries of what's possible."
          </blockquote>
          <div className="text-primary-400 font-semibold">— My Learning Philosophy</div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const AchievementsSection = () => {
  const achievementEntries = [
    { key: "Projects Completed", value: achievements.projectsCompleted, suffix: "+", icon: "🚀", color: "text-primary-400" },
    { key: "Years of Experience", value: achievements.yearsOfExperience, suffix: "+", icon: "⏱️", color: "text-accent-400" },
    { key: "Client Satisfaction", value: achievements.clientSatisfaction, suffix: "/10", icon: "⭐", color: "text-yellow-400" },
    { key: "GitHub Contributions", value: achievements.githubContributions, suffix: "+", icon: "💻", color: "text-green-400" },
    { key: "Technologies Mastered", value: achievements.technologiesMastered, suffix: "+", icon: "🛠️", color: "text-blue-400" },
    { key: "Awards Won", value: achievements.awards || 5, suffix: "", icon: "🏆", color: "text-orange-400" },
  ];

  return (
    <Section className="bg-gradient-to-b from-transparent via-neutral-950/30 to-transparent">
      <motion.div className="w-full space-y-12" whileInView="visible" viewport={{ once: true }}>
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Achievements & Metrics
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Milestones that reflect my journey, growth, and impact in the world of technology
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementEntries.map((achievement, index) => (
            <motion.div
              key={achievement.key}
              className="card-modern text-center group hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${achievement.color} group-hover:scale-110 transition-transform`}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {achievement.value}{achievement.suffix}
                    </motion.span>
                  </div>
                  <div className="text-neutral-300 font-medium">
                    {achievement.key}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card-modern">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl">🌟</span>
              <div>
                <h3 className="text-xl font-bold text-neutral-100">Recent Highlights</h3>
                <p className="text-neutral-400 text-sm">Latest achievements</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span>Completed 250+ projects successfully</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                <span>Achieved 100% client satisfaction rate</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>1800+ GitHub contributions this year</span>
              </li>
            </ul>
          </div>

          <div className="card-modern">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="text-xl font-bold text-neutral-100">Goals for 2025</h3>
                <p className="text-neutral-400 text-sm">Future milestones</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Launch 50 new innovative projects</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Master 5 new technologies</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Expand international client base</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ServicesSection = () => {
  return (
    <Section className="bg-gradient-to-b from-transparent via-neutral-950/20 to-transparent">
      <motion.div className="w-full space-y-12" whileInView="visible" viewport={{ once: true }}>
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Services & Solutions
          </motion.h2>
          <motion.p 
            className="text-neutral-400 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transforming ideas into digital reality with cutting-edge technologies and innovative approaches.
            Let's bring your vision to life.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card-modern group hover:border-primary-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-primary-300 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <div className="text-sm text-neutral-500 font-medium">Technologies:</div>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-neutral-800/50 text-neutral-300 text-sm rounded-full border border-neutral-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-700/30">
                    <span className="text-sm text-neutral-400">Starting from:</span>
                    <span className="text-primary-400 font-semibold">{service.price} rates</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 p-8 glass-morphism rounded-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neutral-100 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together. 
            I'm always excited to work on innovative projects that push boundaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Start a Project
            </button>
            <button className="btn-secondary">
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mayzgjbd");
  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFormValid =
    formValues.user_name.trim() &&
    formValues.user_email.trim() &&
    formValues.message.trim();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Get the reCAPTCHA token
      const recaptchaToken = await executeRecaptcha();

      if (!recaptchaToken) {
        alert("reCAPTCHA verification failed.");
        setIsSubmitting(false);
        return;
      }

      // Proceed with form submission
      emailjs
        .sendForm("service_oxjis4c", "template_ho0bwum", e.target, {
          publicKey: "7i7_YEAdQWQzN_UBZ",
        })
        .then(
          () => {
            alert("Form submitted successfully!");
            setFormValues({ user_name: "", user_email: "", message: "" });
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            alert("Form submission failed. Please try again.");
          }
        );
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeRecaptcha = async () => {
    return new Promise((resolve) => {
      if (!window.grecaptcha) {
        console.error("reCAPTCHA script is not loaded.");
        resolve("");
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute( import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
            action: "submit",
          })
          .then((token) => {
            setRecaptchaToken(token);
            resolve(token);
          })
          .catch((error) => {
            console.error("reCAPTCHA execution failed:", error);
            resolve("");
          });
      });
    });
  };

  return (
    <Section>
      <motion.div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-responsive-lg font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            className="text-neutral-300 max-w-2xl mx-auto text-center text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="card-modern"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {state.succeeded ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-primary-400 mb-2">Message Sent!</h3>
                <p className="text-neutral-300">Thanks for reaching out! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-200 mb-2"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      id="name"
                      value={formValues.user_name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-200 mb-2"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="email"
                      value={formValues.user_email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                    />
                    <ValidationError
                      className="mt-1 text-red-400 text-sm"
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-200 mb-2"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none"
                  />
                  <ValidationError
                    className="mt-1 text-red-400 text-sm"
                    errors={state.errors}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    isFormValid && !isSubmitting
                      ? "btn-primary hover:scale-105"
                      : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  }`}
                  whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Quick Contact */}
            <div className="card-modern">
              <h3 className="text-xl font-bold text-neutral-200 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-300 font-medium">Email</p>
                    <a href="mailto:arhanansari2009@gmail.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                      arhanansari2009@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-300 font-medium">Response Time</p>
                    <p className="text-accent-400">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-modern">
              <h3 className="text-xl font-bold text-neutral-200 mb-6">Quick Start</h3>
              <div className="space-y-3">
                <a 
                  href="https://calendly.com/arhanansari2009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg hover:bg-neutral-700/30 transition-colors group"
                >
                  <span className="text-neutral-300 group-hover:text-primary-300">Schedule a Call</span>
                  <svg className="w-5 h-5 text-neutral-500 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <a 
                  href="https://github.com/ArhanAnsari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg hover:bg-neutral-700/30 transition-colors group"
                >
                  <span className="text-neutral-300 group-hover:text-primary-300">View My Code</span>
                  <svg className="w-5 h-5 text-neutral-500 group-hover:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="card-modern">
              <h3 className="text-xl font-bold text-neutral-200 mb-6">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/ArhanAnsari" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                  <svg className="w-6 h-6 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/arhan-ansari" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/codewitharhan" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                  <svg className="w-6 h-6 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
