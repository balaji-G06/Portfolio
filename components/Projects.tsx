"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Cpu, Wifi, Heart, Cloud, Brain, Shield } from "lucide-react"
import Image from "next/image"

const projectCategories = ["All", "IoT", "Healthcare", "AI/ML", "Hardware", "Security"]

const projects = [
  {
    title: "Oxy Guard Pro",
    description:
      "Next-generation oxygen monitoring ecosystem with AI-powered predictive analytics and real-time emergency response system.",
    longDescription:
      "Revolutionary healthcare solution featuring ESP32-based sensors, machine learning algorithms for pattern recognition, automated alert systems, comprehensive analytics dashboard, and integration with hospital management systems. Includes mobile app with telemedicine capabilities.",
    tech: ["ESP32", "React", "Node.js", "MongoDB", "TensorFlow", "Socket.io", "AWS IoT"],
    category: "Healthcare",
    icon: Heart,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Production",
    impact: "Deployed in 5 hospitals, 99.7% uptime",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    featured: true,
    metrics: {
      users: "500+",
      accuracy: "99.7%",
      response: "< 2s",
    },
  },
  {
    title: "Yoga Mitra AI",
    description:
      "Advanced AI-powered yoga assistant with real-time pose correction, personalized routines, and biometric monitoring.",
    longDescription:
      "Intelligent wellness companion leveraging MediaPipe, TensorFlow, and computer vision for precise pose detection. Features include real-time feedback, progress tracking, personalized workout recommendations, heart rate monitoring, and social features for community engagement.",
    tech: ["Python", "OpenCV", "TensorFlow", "React Native", "MediaPipe", "Firebase", "WebRTC"],
    category: "AI/ML",
    icon: Brain,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Beta",
    impact: "1000+ active users, 4.8★ rating",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    featured: true,
    metrics: {
      users: "1000+",
      accuracy: "94%",
      sessions: "10k+",
    },
  },
  {
    title: "Smart Yoga Mat 2.0",
    description:
      "Revolutionary IoT-enabled yoga mat with pressure mapping, balance analysis, and haptic feedback system.",
    longDescription:
      "Next-generation yoga mat embedded with 64 pressure sensors, accelerometers, gyroscopes, and haptic actuators. Features Bluetooth 5.0 connectivity, mobile app integration, detailed pose analysis, balance scoring, and progress tracking with cloud synchronization.",
    tech: ["Arduino", "React Native", "Firebase", "Bluetooth 5.0", "TensorFlow Lite"],
    category: "IoT",
    icon: Wifi,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Prototype",
    impact: "Patent filed, CES 2024 showcase",
    image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=600&h=400&fit=crop",
    featured: true,
    metrics: {
      sensors: "64",
      battery: "30 days",
      accuracy: "96%",
    },
  },
  {
    title: "Neural Weather Station",
    description:
      "AI-enhanced weather monitoring system with predictive analytics and climate change impact assessment.",
    longDescription:
      "Comprehensive environmental monitoring solution featuring multi-sensor arrays, machine learning-based weather prediction, air quality analysis, and climate trend visualization. Includes edge computing capabilities and integration with meteorological databases.",
    tech: ["Raspberry Pi 4", "Python", "Next.js", "InfluxDB", "TensorFlow", "LoRaWAN"],
    category: "IoT",
    icon: Cloud,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Completed",
    impact: "96% prediction accuracy, 50+ installations",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    metrics: {
      accuracy: "96%",
      range: "10km",
      sensors: "12",
    },
  },
  {
    title: "Quantum Edge Processor",
    description:
      "Custom FPGA-based neural network accelerator optimized for edge AI applications with quantum-inspired algorithms.",
    longDescription:
      "High-performance neural network processor designed for edge computing, featuring custom FPGA implementation, optimized inference engine, quantum-inspired optimization algorithms, and support for multiple AI frameworks.",
    tech: ["FPGA", "Verilog", "C++", "Python", "CUDA", "OpenCL"],
    category: "Hardware",
    icon: Cpu,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Research",
    impact: "5x faster inference, 70% power reduction",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    metrics: {
      speed: "5x faster",
      power: "-70%",
      efficiency: "95%",
    },
  },
  {
    title: "SecureHome IoT Hub",
    description: "Military-grade secure home automation system with blockchain authentication and quantum encryption.",
    longDescription:
      "Advanced home automation solution featuring voice control, automated scheduling, energy monitoring, security integration, blockchain-based device authentication, and quantum-resistant encryption protocols.",
    tech: ["ESP32", "React", "Node.js", "MQTT", "Blockchain", "AES-256"],
    category: "Security",
    icon: Shield,
    github: "https://github.com",
    demo: "https://demo.com",
    status: "Completed",
    impact: "Zero security breaches, 40% energy savings",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    metrics: {
      devices: "50+",
      uptime: "99.9%",
      savings: "40%",
    },
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Innovation Showcase
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Pioneering the convergence of electronics, AI, and IoT to create transformative solutions that shape
          tomorrow's technology landscape.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      {selectedCategory === "All" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Featured Projects
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Production"
                          ? "bg-green-900/70 text-green-300"
                          : project.status === "Beta"
                            ? "bg-blue-900/70 text-blue-300"
                            : project.status === "Prototype"
                              ? "bg-yellow-900/70 text-yellow-300"
                              : "bg-purple-900/70 text-purple-300"
                      }`}
                    >
                      {project.status}
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 left-4 bg-gray-900/70 p-3 rounded-full backdrop-blur-sm">
                      <IconComponent className="text-purple-400" size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-purple-400 font-bold text-sm">{value}</div>
                          <div className="text-gray-500 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs hover:bg-purple-800/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-400 font-medium">{project.impact}</span>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <Github size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <ExternalLink size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* All Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full overflow-hidden rounded-xl">
                  {/* Project Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Status Badge */}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium z-10 ${
                        project.status === "Production"
                          ? "bg-green-900/70 text-green-300"
                          : project.status === "Beta"
                            ? "bg-blue-900/70 text-blue-300"
                            : project.status === "Prototype"
                              ? "bg-yellow-900/70 text-yellow-300"
                              : "bg-purple-900/70 text-purple-300"
                      }`}
                    >
                      {project.status}
                    </span>

                    {/* Icon */}
                    <div className="absolute bottom-3 left-3 bg-gray-900/70 p-2 rounded-full backdrop-blur-sm">
                      <IconComponent className="text-purple-400" size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-purple-900/20 text-purple-300 rounded text-xs hover:bg-purple-800/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-400 font-medium">{project.impact}</span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-purple-400 transition-colors">
                          <Github size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-purple-400 transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-80 w-full">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gray-900/70 p-3 rounded-full backdrop-blur-sm">
                      <selectedProject.icon className="text-purple-400" size={32} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white">{selectedProject.title}</h3>
                      <span className="text-purple-400 text-lg">{selectedProject.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">{selectedProject.longDescription}</p>

                {/* Metrics Grid */}
                {selectedProject.metrics && (
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{value}</div>
                        <div className="text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full border border-purple-700/50 hover:bg-purple-800/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Project Impact</h4>
                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-6 border border-purple-700/30">
                    <p className="text-gray-300 text-lg">{selectedProject.impact}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 transition-all duration-300"
                  >
                    <Github size={20} />
                    <span>View Source Code</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
