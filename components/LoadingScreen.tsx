"use client"

import { useMemo } from "react"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Sphere } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"

function QuantumCore({ progress }) {
  const coreRef = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (coreRef.current && mounted) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  if (!mounted) return null

  return (
    <group ref={coreRef}>
      {/* Central Core */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial color="#8E05C2" emissive="#8E05C2" emissiveIntensity={0.5} transparent opacity={0.8} />
      </Sphere>

      {/* Orbiting Rings */}
      {[1.5, 2.2, 3.0].map((radius, index) => (
        <group key={index} rotation={[(Math.PI / 4) * index, 0, (Math.PI / 3) * index]}>
          <mesh>
            <torusGeometry args={[radius, 0.05, 16, 100]} />
            <meshStandardMaterial
              color={index === 0 ? "#8E05C2" : index === 1 ? "#700B97" : "#3E065F"}
              emissive={index === 0 ? "#8E05C2" : index === 1 ? "#700B97" : "#3E065F"}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Progress Indicator */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[3.5, 3.7, 64, 1, 0, (progress * Math.PI * 2) / 100]} />
        <meshBasicMaterial color="#8E05C2" transparent opacity={0.9} />
      </mesh>

      {/* Floating Data Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]}>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#700B97"
              emissive="#700B97"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function NeuralNetwork() {
  const networkRef = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nodes = useMemo(() => {
    const layers = [8, 12, 16, 12, 8]
    const nodePositions = []

    layers.forEach((nodeCount, layerIndex) => {
      for (let i = 0; i < nodeCount; i++) {
        nodePositions.push({
          position: [(layerIndex - 2) * 3, (i - nodeCount / 2) * 0.8, (Math.random() - 0.5) * 2],
          layer: layerIndex,
          active: Math.random() > 0.3,
        })
      }
    })

    return nodePositions
  }, [])

  useFrame((state) => {
    if (networkRef.current && mounted) {
      networkRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  if (!mounted) return null

  return (
    <group ref={networkRef} position={[0, 0, -5]}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={node.active ? "#8E05C2" : "#3E065F"}
            emissive={node.active ? "#8E05C2" : "#000000"}
            emissiveIntensity={node.active ? 0.5 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function LoadingScreen({ progress, onComplete }) {
  const [loadingStage, setLoadingStage] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stages = [
    { text: "Initializing Quantum Processors", sub: "Calibrating neural pathways...", threshold: 0 },
    { text: "Loading Circuit Architectures", sub: "Synchronizing IoT protocols...", threshold: 20 },
    { text: "Establishing Neural Networks", sub: "Training AI models...", threshold: 40 },
    { text: "Optimizing Performance Matrix", sub: "Fine-tuning algorithms...", threshold: 60 },
    { text: "Finalizing System Integration", sub: "Preparing user interface...", threshold: 80 },
    { text: "Welcome to the Future", sub: "System ready for innovation!", threshold: 95 },
  ]

  useEffect(() => {
    const currentStage = stages.findIndex(
      (stage, index) =>
        progress >= stage.threshold && (index === stages.length - 1 || progress < stages[index + 1]?.threshold),
    )
    if (currentStage !== -1) {
      setLoadingStage(currentStage)
    }

    if (progress >= 100) {
      setTimeout(() => onComplete?.(), 800)
    }
  }, [progress, onComplete])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-xl">Initializing...</div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 bg-gradient-to-br from-black via-[#3E065F]/10 to-black z-50 flex items-center justify-center overflow-hidden"
      >
        {/* Animated Grid Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(142, 5, 194, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(142, 5, 194, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* 3D Scene */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} color="#8E05C2" intensity={0.6} />
            <pointLight position={[10, -10, 10]} color="#700B97" intensity={0.6} />
            <pointLight position={[0, 10, -10]} color="#3E065F" intensity={0.4} />

            <QuantumCore progress={progress} />
            <NeuralNetwork />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <motion.div
            key={loadingStage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#3E065F] via-[#700B97] to-[#8E05C2] bg-clip-text text-transparent mb-6 leading-tight">
              {stages[loadingStage]?.text}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{stages[loadingStage]?.sub}</p>
          </motion.div>

          {/* Ultra Smooth Progress Bar */}
          <div className="relative mb-8">
            <div className="w-full h-4 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#3E065F] via-[#700B97] to-[#8E05C2] relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/3"
                />
              </motion.div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span className="text-gray-500">0%</span>
              <motion.span
                key={progress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[#8E05C2] font-bold"
              >
                {progress.toFixed(1)}%
              </motion.span>
              <span className="text-gray-500">100%</span>
            </div>
          </div>

          {/* System Status Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { name: "Quantum Core", status: progress > 25, color: "bg-[#8E05C2]" },
              { name: "Neural Net", status: progress > 50, color: "bg-[#700B97]" },
              { name: "IoT Matrix", status: progress > 75, color: "bg-[#3E065F]" },
              { name: "AI Engine", status: progress > 90, color: "bg-[#8E05C2]" },
            ].map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
              >
                <div className="text-xs text-gray-400 mb-2">{system.name}</div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{
                      scale: system.status ? [1, 1.2, 1] : 1,
                      opacity: system.status ? 1 : 0.3,
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-3 h-3 rounded-full ${system.color}`}
                  />
                  <span className={`text-xs ${system.status ? "text-green-400" : "text-gray-500"}`}>
                    {system.status ? "Online" : "Standby"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Loading Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-3 border-[#3E065F]/30 border-t-[#8E05C2] rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
