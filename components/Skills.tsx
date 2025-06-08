"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Cpu, Wifi, Database, Palette, Wrench, Brain, Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "C/C++", level: 95, description: "Embedded systems & performance-critical applications", projects: 15 },
      { name: "Python", level: 90, description: "AI/ML, automation & data analysis", projects: 12 },
      { name: "JavaScript", level: 85, description: "Full-stack web development", projects: 10 },
      { name: "TypeScript", level: 80, description: "Type-safe web applications", projects: 8 },
      { name: "Rust", level: 70, description: "Systems programming & WebAssembly", projects: 3 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "TensorFlow", level: 85, description: "Deep learning & neural networks", projects: 8 },
      { name: "PyTorch", level: 80, description: "Research & experimentation", projects: 6 },
      { name: "OpenCV", level: 90, description: "Computer vision applications", projects: 10 },
      { name: "Scikit-learn", level: 85, description: "Classical machine learning", projects: 7 },
      { name: "CUDA", level: 75, description: "GPU-accelerated computing", projects: 4 },
    ],
  },
  {
    title: "Hardware & Embedded",
    icon: Cpu,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Arduino", level: 98, description: "Rapid prototyping & IoT projects", projects: 20 },
      { name: "Raspberry Pi", level: 90, description: "Edge computing & automation", projects: 15 },
      { name: "ESP32/ESP8266", level: 95, description: "WiFi-enabled IoT devices", projects: 18 },
      { name: "FPGA", level: 75, description: "Custom digital logic design", projects: 5 },
      { name: "STM32", level: 80, description: "Professional microcontroller development", projects: 8 },
    ],
  },
  {
    title: "IoT & Networking",
    icon: Wifi,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "MQTT", level: 90, description: "Lightweight IoT messaging", projects: 12 },
      { name: "LoRaWAN", level: 85, description: "Long-range IoT communication", projects: 6 },
      { name: "Bluetooth/WiFi", level: 95, description: "Wireless connectivity protocols", projects: 16 },
      { name: "Edge Computing", level: 80, description: "Distributed IoT processing", projects: 8 },
      { name: "5G/NB-IoT", level: 70, description: "Cellular IoT technologies", projects: 4 },
    ],
  },
  {
    title: "Web Technologies",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React/Next.js", level: 90, description: "Modern web applications", projects: 12 },
      { name: "Node.js", level: 85, description: "Backend API development", projects: 10 },
      { name: "MongoDB", level: 80, description: "NoSQL database management", projects: 8 },
      { name: "PostgreSQL", level: 75, description: "Relational database systems", projects: 6 },
      { name: "GraphQL", level: 70, description: "API query language", projects: 4 },
    ],
  },
  {
    title: "Security & Blockchain",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    skills: [
      { name: "Cryptography", level: 80, description: "Encryption & security protocols", projects: 6 },
      { name: "Blockchain", level: 75, description: "Decentralized applications", projects: 4 },
      { name: "Penetration Testing", level: 70, description: "Security assessment", projects: 3 },
      { name: "Zero Trust", level: 65, description: "Modern security architecture", projects: 2 },
    ],
  },
  {
    title: "Design & Tools",
    icon: Palette,
    color: "from-pink-500 to-purple-500",
    skills: [
      { name: "KiCad", level: 85, description: "PCB design & schematic capture", projects: 12 },
      { name: "Figma", level: 75, description: "UI/UX design & prototyping", projects: 8 },
      { name: "Git", level: 95, description: "Version control & collaboration", projects: 25 },
      { name: "Docker", level: 80, description: "Containerization & deployment", projects: 10 },
      { name: "Kubernetes", level: 70, description: "Container orchestration", projects: 4 },
    ],
  },
  {
    title: "Specialized Tools",
    icon: Wrench,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "MATLAB/Simulink", level: 80, description: "Engineering simulation", projects: 6 },
      { name: "LabVIEW", level: 75, description: "Instrumentation & control", projects: 4 },
      { name: "Altium Designer", level: 70, description: "Professional PCB design", projects: 3 },
      { name: "SolidWorks", level: 65, description: "3D mechanical design", projects: 2 },
    ],
  },
]

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const SelectedCategoryIcon = skillCategories[selectedCategory].icon

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Technical Mastery
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Comprehensive expertise across the full spectrum of modern technology, from quantum computing to edge AI and
          everything in between.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Category Selector */}
        <div className="lg:col-span-1">
          <div className="space-y-3">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.title}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(index)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left group ${
                    selectedCategory === index
                      ? `bg-gradient-to-r ${category.color} border-transparent text-white shadow-xl`
                      : "bg-gray-900 border-gray-700 hover:border-gray-600 text-gray-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedCategory === index ? "bg-white/20" : "bg-gray-800 group-hover:bg-gray-700"
                      } transition-colors`}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{category.title}</div>
                      <div className={`text-xs ${selectedCategory === index ? "text-white/70" : "text-gray-500"}`}>
                        {category.skills.length} skills
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Skills Display */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${skillCategories[selectedCategory].color}`}>
                  <SelectedCategoryIcon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{skillCategories[selectedCategory].title}</h3>
                  <p className="text-gray-400">Professional expertise and project experience</p>
                </div>
              </div>

              <div className="space-y-6">
                {skillCategories[selectedCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 border border-transparent hover:border-purple-500/30"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skillCategories[selectedCategory].color} text-white`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-2">
                          {skill.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{skill.projects} projects</span>
                          <span>•</span>
                          <span>{Math.floor(skill.level / 20)} years experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Level Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${skillCategories[selectedCategory].color} relative`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </motion.div>
                      </div>

                      {/* Skill Level Indicator */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredSkill?.name === skill.name ? 1 : 0 }}
                        className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold"
                        style={{ left: `${skill.level}%`, transform: "translateX(-50%)" }}
                      >
                        {skill.level}%
                      </motion.div>
                    </div>

                    {/* Project Examples */}
                    {hoveredSkill?.name === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">Recent Projects</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                          <div>• IoT Weather Station</div>
                          <div>• Smart Home System</div>
                          <div>• Healthcare Monitor</div>
                          <div>• AI Yoga Assistant</div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { value: "25+", label: "Projects Completed", color: "from-purple-500 to-pink-500", icon: "🚀" },
          { value: "8", label: "Skill Categories", color: "from-blue-500 to-cyan-500", icon: "🎯" },
          { value: "50+", label: "Technologies", color: "from-green-500 to-emerald-500", icon: "⚡" },
          { value: "4+", label: "Years Experience", color: "from-orange-500 to-red-500", icon: "🏆" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="group bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-600 text-center transition-all duration-300 cursor-pointer"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div
              className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform`}
            >
              {stat.value}
            </div>
            <div className="text-gray-300 group-hover:text-white transition-colors font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
