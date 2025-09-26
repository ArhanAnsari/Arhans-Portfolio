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
        flex flex-col items-start
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
    <div className="flex flex-col items-center w-screen relative interface-content">
      {/* Enhanced Background Coverage */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 -z-50" />
      <div className="fixed inset-0 hero-pattern opacity-30 -z-40" />
      
      {/* Floating particles background */}
      <div className="particles-container">
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
    level: 100,
    icon: "🎮",
    category: "3D Development"
  },
  {
    title: "Full Stack Web Development",
    level: 100,
    icon: "⚡",
    category: "Backend"
  },
  {
    title: "React / React Native",
    level: 100,
    icon: "⚛️",
    category: "Frontend"
  },
  {
    title: "UI/UX Design",
    level: 95,
    icon: "🎨",
    category: "Design"
  },
  {
    title: "Node.js / Express",
    level: 98,
    icon: "🚀",
    category: "Backend"
  },
  {
    title: "3D Modeling & Animation",
    level: 95,
    icon: "🎯",
    category: "3D Development"
  },
  {
    title: "TypeScript",
    level: 92,
    icon: "📘",
    category: "Programming"
  },
  {
    title: "Database Management",
    level: 90,
    icon: "🗄️",
    category: "Backend"
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
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {skill.icon}
                          </span>
                          <h4 className="font-semibold text-neutral-200 group-hover:text-primary-300 transition-colors">
                            {skill.title}
                          </h4>
                        </div>
                        <span className="text-sm text-primary-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-glow"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
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

        {/* Project Stats */}
        <motion.div
          className="mt-16 p-8 glass-morphism rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
              <div className="text-3xl font-bold text-primary-400">100+</div>
              <div className="text-sm text-neutral-400">Hours Coded</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-400">10</div>
              <div className="text-sm text-neutral-400">Happy Clients</div>
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
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-8">Testimonials</h2>
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
      <h2 className="text-3xl md:text-5xl font-bold text-black">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-indigo-500 text-center">Thanks for your message!</p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* Name Field */}
            <label
              htmlFor="name"
              className="font-medium text-indigo-500 block mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              value={formValues.user_name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />

            {/* Email Field */}
            <label
              htmlFor="email"
              className="font-medium text-indigo-500 block mb-1 mt-8"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              value={formValues.user_email}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Message Field */}
            <label
              htmlFor="message"
              className="font-medium text-indigo-500 block mb-1 mt-8"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              value={formValues.message}
              onChange={handleInputChange}
              className="h-32 block w-full rounded-md border-0 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`py-4 px-8 rounded-lg font-bold text-lg mt-16 ${
                isFormValid
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
