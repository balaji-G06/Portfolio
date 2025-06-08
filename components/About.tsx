"use client"

import { motion } from "framer-motion"
import { Cpu, Zap, Wifi, Code, Wrench, Heart, Brain, Rocket } from "lucide-react"

export default function About() {
  const highlights = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "TensorFlow, OpenCV, Neural Networks, Computer Vision",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Cpu,
      title: "Hardware Design",
      description: "Arduino, Raspberry Pi, ESP32, PCB Design, FPGA",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Wifi,
      title: "IoT Ecosystems",
      description: "MQTT, LoRaWAN, Edge Computing, Sensor Networks",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "React, Node.js, Python, C/C++, TypeScript, Next.js",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Electronics & Automation",
      description: "Circuit Design, Embedded Systems, Industrial IoT",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "Healthcare Technology",
      description: "Medical Devices, Monitoring Systems, Telemedicine",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Wrench,
      title: "Development Tools",
      description: "KiCad, Git, Docker, Firebase, MongoDB, AWS",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Rocket,
      title: "Innovation & Research",
      description: "Patent Development, R&D, Emerging Technologies",
      color: "from-cyan-500 to-blue-500",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Engineering the Future
          </span>
        </h2>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
          >
            I'm an Electronics & Communication Engineering student at{" "}
            <span className="text-purple-400 font-semibold">SRM Institute of Science and Technology</span>, passionate
            about creating revolutionary solutions that bridge the physical and digital worlds.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            My journey involves architecting next-generation systems like{" "}
            <span className="text-green-400 font-semibold">Oxy Guard</span> - an intelligent oxygen monitoring
            ecosystem, <span className="text-blue-400 font-semibold">Yoga Mitra</span> - an AI-powered wellness
            companion, and <span className="text-pink-400 font-semibold">Smart Yoga Mat</span> - revolutionizing fitness
            through IoT integration. I transform complex engineering challenges into elegant, user-centric innovations.
          </motion.p>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon Container */}
                <div
                  className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="text-white" size={28} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-2xl transition-all duration-300" />
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "20+", label: "Projects Completed", color: "from-purple-500 to-pink-500" },
            { value: "8+", label: "Technologies Mastered", color: "from-blue-500 to-cyan-500" },
            { value: "15+", label: "Hardware Platforms", color: "from-green-500 to-emerald-500" },
            { value: "3+", label: "Years of Innovation", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1, rotateY: 10 }}
              className="group bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-gray-500 text-center transition-all duration-300 cursor-pointer"
            >
              <div
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.value}
              </div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
