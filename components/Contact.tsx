"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Let's Build the Future
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Ready to collaborate on groundbreaking projects? Let's connect and create innovative solutions that push the
          boundaries of technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <Send className="text-purple-400" size={24} />
              <span>Send a Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'd like to discuss a potential project..."
                  rows={5}
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Message...
                  </div>
                ) : (
                  <span>Send Message</span>
                )}

                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/10 to-pink-600/0 -translate-x-full animate-shimmer" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              I'm always open to discussing innovative projects, research opportunities, or just having a chat about
              electronics, IoT, and the future of technology. Feel free to reach out through any of the channels below.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "balaji@example.com",
                href: "mailto:balaji@example.com",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+91 98765 43210",
                href: "tel:+919876543210",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Chennai, Tamil Nadu, India",
                href: "#",
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                whileHover={{ scale: 1.03, x: 10 }}
                href={item.href}
                className="flex items-center space-x-6 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                  <item.icon className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{item.title}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-gray-800">
            <h4 className="text-lg font-semibold text-white mb-4">Connect on Social Media</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com", color: "bg-gray-800 hover:bg-gray-700" },
                { icon: Linkedin, href: "https://linkedin.com", color: "bg-blue-900 hover:bg-blue-800" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-3 rounded-full text-white transition-colors duration-300`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-r from-purple-900/30 via-gray-900 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Currently Available for Projects</h3>
        <p className="text-gray-300 max-w-3xl mx-auto">
          I'm actively seeking new opportunities to collaborate on innovative IoT, electronics, and AI projects. Let's
          create something amazing together!
        </p>
      </motion.div>
    </section>
  )
}
