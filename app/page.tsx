"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import LoadingScreen from "@/components/LoadingScreen"
import Hero from "@/components/Hero"
import CircuitBuilder from "@/components/CircuitBuilder"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import CircuitShowcase from "@/components/CircuitShowcase"
import InteractiveCircuit from "@/components/InteractiveCircuit"
import IoTLab from "@/components/IoTLab"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Faster loading progression
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 2 // Faster loading
      })
    }, 30) // Faster updates

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <LoadingScreen progress={loadingProgress} onComplete={() => setLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <CircuitBuilder />
      <CircuitShowcase />
      <About />
      <Projects />
      <Skills />
      <InteractiveCircuit />
      <IoTLab />
      <Contact />
      <Footer />
    </main>
  )
}
