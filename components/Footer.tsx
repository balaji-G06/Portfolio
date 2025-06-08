"use client"

import { motion } from "framer-motion"
import { Cpu, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-16 px-4 border-t border-gray-800 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="text-purple-400" size={28} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Balaji Gunasekaran
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Electronics & Communication Engineer specializing in IoT, embedded systems, and AI integration. Turning
              innovative ideas into reality through technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Mail, href: "mailto:balaji@example.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Skills", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {["IoT", "Arduino", "ESP32", "React", "Python", "AI/ML", "PCB Design"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Balaji Gunasekaran. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-gray-500 text-sm">Built with Next.js, Three.js & Framer Motion</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
