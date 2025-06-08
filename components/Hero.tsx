"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Stars } from "@react-three/drei"
import { motion } from "framer-motion"
import { Github, Linkedin, Download, ArrowDown, Zap, Cpu, Wifi, CircuitBoardIcon as Circuit } from "lucide-react"
import * as THREE from "three"

function AdvancedCircuitBoard() {
  const groupRef = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Safe circuit paths creation with validation
  const circuitPaths = useMemo(() => {
    if (!mounted) return []

    const paths = []
    try {
      for (let i = 0; i < 20; i++) {
        const points = []
        const startX = (Math.random() - 0.5) * 8
        const startY = (Math.random() - 0.5) * 5
        const startZ = (Math.random() - 0.5) * 1

        points.push(new THREE.Vector3(startX, startY, startZ))

        // Create safe paths with validation
        for (let j = 1; j < 5; j++) {
          const x = startX + (Math.random() - 0.5) * 1.5
          const y = startY + (Math.random() - 0.5) * 1.5
          const z = startZ + (Math.random() - 0.5) * 0.3
          points.push(new THREE.Vector3(x, y, z))
        }

        // Only create curve if we have enough valid points
        if (points.length >= 2) {
          try {
            const curve = new THREE.CatmullRomCurve3(points)
            paths.push({
              curve,
              color: ["#00f2ff", "#9333ea", "#4dff19", "#ff0080"][Math.floor(Math.random() * 4)],
              active: Math.random() > 0.4,
              speed: Math.max(0.1, Math.random() * 0.5 + 0.3),
            })
          } catch (error) {
            console.warn(`Error creating curve ${i}:`, error)
          }
        }
      }
    } catch (error) {
      console.warn("Error creating circuit paths:", error)
    }
    return paths
  }, [mounted])

  // Safe components creation with validation
  const components = useMemo(() => {
    if (!mounted) return []

    const comps = []
    const componentTypes = [
      { type: "microcontroller", color: "#00f2ff", size: [1.0, 0.2, 0.8] },
      { type: "sensor", color: "#4dff19", size: [0.4, 0.4, 0.2] },
      { type: "capacitor", color: "#9333ea", size: [0.2, 0.5, 0.2] },
      { type: "resistor", color: "#ff0080", size: [0.5, 0.12, 0.12] },
      { type: "led", color: "#00f2ff", size: [0.12, 0.12, 0.25] },
      { type: "transistor", color: "#4dff19", size: [0.25, 0.4, 0.12] },
    ]

    try {
      for (let i = 0; i < 15; i++) {
        const compType = componentTypes[Math.floor(Math.random() * componentTypes.length)]

        // Validate component properties
        if (compType.size && compType.size.every((s) => s > 0)) {
          comps.push({
            id: i,
            position: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, Math.random() * 0.4],
            ...compType,
            scale: Math.max(0.6, Math.random() * 0.3 + 0.7), // Ensure positive scale
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
          })
        }
      }
    } catch (error) {
      console.warn("Error creating components:", error)
    }
    return comps
  }, [mounted])

  useFrame((state) => {
    if (groupRef.current && mounted) {
      try {
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.08
      } catch (error) {
        console.warn("Error in circuit board animation:", error)
      }
    }
  })

  const renderComponent = (comp) => {
    const { id, position, scale, rotation, ...componentProps } = comp

    // Validate all properties before rendering
    if (
      !componentProps.size ||
      !Array.isArray(componentProps.size) ||
      componentProps.size.length !== 3 ||
      componentProps.size.some((s) => s <= 0) ||
      !Array.isArray(position) ||
      position.length !== 3 ||
      typeof scale !== "number" ||
      scale <= 0
    ) {
      return null
    }

    try {
      switch (comp.type) {
        case "microcontroller":
          return (
            <group key={id} position={position} scale={scale} rotation={rotation}>
              <mesh>
                <boxGeometry args={componentProps.size} />
                <meshStandardMaterial
                  color={componentProps.color}
                  emissive={componentProps.color}
                  emissiveIntensity={0.3}
                  metalness={0.2}
                  roughness={0.8}
                />
              </mesh>
            </group>
          )

        case "sensor":
          return (
            <group key={id} position={position} scale={scale} rotation={rotation}>
              <mesh>
                <cylinderGeometry
                  args={[
                    Math.max(0.01, componentProps.size[0] / 2),
                    Math.max(0.01, componentProps.size[0] / 2),
                    Math.max(0.01, componentProps.size[1]),
                    8,
                  ]}
                />
                <meshStandardMaterial
                  color={componentProps.color}
                  emissive={componentProps.color}
                  emissiveIntensity={0.4}
                  metalness={0.1}
                  roughness={0.9}
                />
              </mesh>
            </group>
          )

        default:
          return (
            <group key={id} position={position} scale={scale} rotation={rotation}>
              <mesh>
                <boxGeometry args={componentProps.size} />
                <meshStandardMaterial
                  color={componentProps.color}
                  emissive={componentProps.color}
                  emissiveIntensity={0.25}
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
            </group>
          )
      }
    } catch (error) {
      console.warn(`Error rendering component ${id}:`, error)
      return null
    }
  }

  if (!mounted) return null

  return (
    <group ref={groupRef}>
      {/* Safe Circuit Traces */}
      {circuitPaths.map((path, index) => {
        try {
          if (!path.curve) return null

          return (
            <mesh key={`trace-${index}`}>
              <tubeGeometry args={[path.curve, 32, 0.008, 4, false]} />
              <meshStandardMaterial
                color={path.active ? path.color : "#1a1a2e"}
                emissive={path.active ? path.color : "#000000"}
                emissiveIntensity={path.active ? 0.5 : 0}
                transparent
                opacity={path.active ? 0.8 : 0.2}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          )
        } catch (error) {
          console.warn(`Error creating trace ${index}:`, error)
          return null
        }
      })}

      {/* Safe Electronic Components */}
      {components.map((comp) => renderComponent(comp))}

      {/* Safe Data Flow Particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <Float key={`particle-${index}`} speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 2]}>
            <octahedronGeometry args={[0.02, 0]} />
            <meshStandardMaterial
              color={["#00f2ff", "#4dff19", "#9333ea", "#ff0080"][Math.floor(Math.random() * 4)]}
              emissive={["#00f2ff", "#4dff19", "#9333ea", "#ff0080"][Math.floor(Math.random() * 4)]}
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}

      {/* Safe Holographic Grid */}
      <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12, 24, 24]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.08} wireframe side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const points = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { particles, particleCount } = useMemo(() => {
    if (!mounted) return { particles: new Float32Array(0), particleCount: 0 }

    const count = 1500 // Safe particle count

    try {
      // Ensure we have a positive, valid array length
      const arrayLength = Math.max(0, count * 3)
      if (arrayLength === 0) {
        return { particles: new Float32Array(0), particleCount: 0 }
      }

      const temp = new Float32Array(arrayLength)

      for (let i = 0; i < count; i++) {
        const index = i * 3
        if (index + 2 < temp.length) {
          temp[index] = (Math.random() - 0.5) * 25 // x
          temp[index + 1] = (Math.random() - 0.5) * 15 // y
          temp[index + 2] = (Math.random() - 0.5) * 15 // z
        }
      }

      return { particles: temp, particleCount: count }
    } catch (error) {
      console.warn("Error creating particle field:", error)
      return { particles: new Float32Array(0), particleCount: 0 }
    }
  }, [mounted])

  useFrame((state) => {
    if (points.current && mounted && particleCount > 0) {
      try {
        points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.03
        points.current.rotation.y = state.clock.elapsedTime * 0.005
      } catch (error) {
        console.warn("Error in particle animation:", error)
      }
    }
  })

  if (!mounted || particles.length === 0 || particleCount === 0) return null

  try {
    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={particles} count={particleCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.008} color="#00f2ff" transparent opacity={0.5} sizeAttenuation={true} />
      </points>
    )
  } catch (error) {
    console.warn("Error rendering particle field:", error)
    return null
  }
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToNext = () => {
    try {
      const element = document.getElementById("circuit-builder")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Error scrolling to next section:", error)
    }
  }

  if (!mounted) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]"
      >
        <div className="text-white text-xl animate-pulse">Initializing Quantum Matrix...</div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Safe 3D Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            try {
              gl.setClearColor("#0a0a0f", 1)
            } catch (error) {
              console.warn("Error setting clear color:", error)
            }
          }}
          onError={(error) => {
            console.warn("Canvas error:", error)
          }}
        >
          <ambientLight intensity={0.25} />
          <directionalLight position={[6, 6, 4]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-6, -6, -6]} color="#00f2ff" intensity={0.6} />
          <pointLight position={[6, -6, 6]} color="#9333ea" intensity={0.4} />
          <pointLight position={[0, 6, -6]} color="#4dff19" intensity={0.3} />

          <Stars radius={60} depth={30} count={2000} factor={2} saturation={0.2} fade speed={0.5} />
          <ParticleField />
          <AdvancedCircuitBoard />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>

      {/* Safe Grid Overlay */}
      <div className="absolute inset-0 opacity-8">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 242, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 242, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Safe Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { Icon: Cpu, position: "top-20 left-20", delay: 0, color: "text-electric" },
          { Icon: Wifi, position: "top-40 right-20", delay: 0.5, color: "text-neon" },
          { Icon: Zap, position: "bottom-40 left-40", delay: 1, color: "text-quantum" },
          { Icon: Circuit, position: "bottom-20 right-40", delay: 1.5, color: "text-cyber" },
        ].map(({ Icon, position, delay, color }, index) => (
          <motion.div
            key={`icon-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.15, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
              ease: "easeInOut",
            }}
            className={`absolute ${position} ${color} drop-shadow-[0_0_8px_currentColor]`}
          >
            <Icon size={40} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block bg-gradient-to-r from-electric via-quantum to-neon bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]"
            >
              Balaji
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block bg-gradient-to-r from-cyber via-electric to-quantum bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,128,0.4)]"
            >
              Gunasekaran
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]">
              Electronics & Communication Engineer
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pioneering the convergence of{" "}
              <span className="text-electric font-semibold animate-pulse drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">
                Quantum Computing
              </span>
              ,{" "}
              <span className="text-neon font-semibold animate-pulse drop-shadow-[0_0_8px_rgba(77,255,25,0.6)]">
                Neural Networks
              </span>
              , and{" "}
              <span className="text-quantum font-semibold animate-pulse drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]">
                IoT Ecosystems
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(0, 242, 255, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToNext}
            className="group relative bg-gradient-to-r from-electric to-quantum hover:from-neon hover:to-cyber text-white px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(0,242,255,0.3)]"
          >
            <span className="relative z-10">Enter the Matrix</span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
              borderColor: "#00f2ff",
              boxShadow: "0 0 15px rgba(0, 242, 255, 0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="group border-2 border-electric text-electric hover:bg-electric/5 px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Neural Profile</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {[
            { Icon: Github, href: "https://github.com", color: "hover:text-electric" },
            { Icon: Linkedin, href: "https://linkedin.com", color: "hover:text-quantum" },
          ].map(({ Icon, href, color }, index) => (
            <motion.a
              key={`social-${index}`}
              whileHover={{
                scale: 1.2,
                rotate: 3,
                filter: "drop-shadow(0 0 8px currentColor)",
              }}
              whileTap={{ scale: 0.9 }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${color} transition-all duration-300`}
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Safe Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
          className="flex flex-col items-center space-y-1"
        >
          <span className="text-gray-300 text-sm font-medium drop-shadow-[0_0_6px_rgba(0,242,255,0.4)]">
            Explore the Future
          </span>
          <ArrowDown className="text-electric animate-pulse" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
