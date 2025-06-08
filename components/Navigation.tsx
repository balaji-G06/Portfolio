"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Cpu } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = [
        "home",
        "circuit-builder",
        "circuit-showcase",
        "about",
        "projects",
        "skills",
        "circuit-designer",
        "iot-lab",
        "contact",
      ]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Circuit Builder", href: "#circuit-builder" },
    { name: "Circuit Lab", href: "#circuit-showcase" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "IoT Lab", href: "#iot-lab" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-electric/30 shadow-[0_4px_20px_rgba(0,242,255,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <div className="relative">
              <Cpu className="text-electric" size={32} />
              <motion.div
                className="absolute -inset-2 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(0, 242, 255, 0)",
                    "0 0 20px rgba(0, 242, 255, 0.8)",
                    "0 0 0px rgba(0, 242, 255, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-electric to-quantum bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">
                Balaji Gunasekaran
              </span>
              <div className="text-xs text-gray-400">Electronics Engineer</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 relative ${
                  activeSection === item.href.substring(1) ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-electric/20 to-quantum/20 rounded-lg border border-electric/30"
                    initial={false}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-electric transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-electric/30 rounded-b-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-electric/20 to-quantum/20 text-white border border-electric/30"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
