"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

function InteractiveCircuitBoard() {
  const boardRef = useRef()
  const [hoveredComponent, setHoveredComponent] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const components = useMemo(
    () => [
      {
        id: 1,
        type: "microcontroller",
        position: [0, 0, 0.1],
        size: [2, 1.5, 0.2],
        color: "#1a1a2e",
        label: "ESP32",
        description: "WiFi & Bluetooth MCU",
      },
      {
        id: 2,
        type: "sensor",
        position: [-3, 2, 0.1],
        size: [0.8, 0.8, 0.3],
        color: "#4ecdc4",
        label: "DHT22",
        description: "Temperature & Humidity",
      },
      {
        id: 3,
        type: "display",
        position: [3, 1, 0.1],
        size: [1.5, 1, 0.1],
        color: "#45b7d1",
        label: "OLED",
        description: "128x64 Display",
      },
      {
        id: 4,
        type: "power",
        position: [-2, -2, 0.1],
        size: [1, 0.5, 0.4],
        color: "#ff6b6b",
        label: "LiPo",
        description: "3.7V Battery",
      },
      {
        id: 5,
        type: "wireless",
        position: [2, -1.5, 0.1],
        size: [0.6, 0.6, 0.8],
        color: "#96ceb4",
        label: "LoRa",
        description: "Long Range Radio",
      },
    ],
    [],
  )

  const traces = useMemo(() => {
    if (!mounted) return []
    const traceArray = []
    for (let i = 0; i < components.length - 1; i++) {
      for (let j = i + 1; j < components.length; j++) {
        const start = components[i].position
        const end = components[j].position
        traceArray.push({
          id: `${i}-${j}`,
          start: new THREE.Vector3(start[0], start[1], 0.05),
          end: new THREE.Vector3(end[0], end[1], 0.05),
          active: Math.random() > 0.3,
        })
      }
    }
    return traceArray
  }, [components, mounted])

  useFrame((state) => {
    if (boardRef.current && mounted) {
      boardRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  if (!mounted) return null

  return (
    <group ref={boardRef}>
      {/* PCB Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 6, 0.1]} />
        <meshStandardMaterial color="#0d4f3c" />
      </mesh>

      {/* Circuit Traces */}
      {traces.map((trace) => (
        <mesh key={trace.id}>
          <tubeGeometry args={[new THREE.CatmullRomCurve3([trace.start, trace.end]), 64, 0.03, 8, false]} />
          <meshStandardMaterial
            color={trace.active ? "#00ff88" : "#004d40"}
            emissive={trace.active ? "#00ff88" : "#000000"}
            emissiveIntensity={trace.active ? 0.3 : 0}
          />
        </mesh>
      ))}

      {/* Electronic Components */}
      {components.map((component) => (
        <Float key={component.id} speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <group
            position={component.position}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredComponent(component)
            }}
            onPointerOut={() => setHoveredComponent(null)}
          >
            <mesh>
              <boxGeometry args={component.size} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hoveredComponent?.id === component.id ? 0.5 : 0.1}
              />
            </mesh>

            {/* Component Labels */}
            <Text
              position={[0, component.size[1] / 2 + 0.3, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="bottom"
            >
              {component.label}
            </Text>

            {/* Hover Info */}
            {hoveredComponent?.id === component.id && (
              <Html position={[0, -component.size[1] / 2 - 0.5, 0]} center>
                <div className="bg-black/80 text-white px-3 py-2 rounded-lg border border-purple-500 text-sm whitespace-nowrap">
                  {component.description}
                </div>
              </Html>
            )}

            {/* Connection Points */}
            {[
              [-component.size[0] / 2, 0, component.size[2] / 2],
              [component.size[0] / 2, 0, component.size[2] / 2],
              [0, -component.size[1] / 2, component.size[2] / 2],
              [0, component.size[1] / 2, component.size[2] / 2],
            ].map((pinPos, index) => (
              <mesh key={index} position={pinPos}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} />
              </mesh>
            ))}
          </group>
        </Float>
      ))}

      {/* Data Flow Particles */}
      {traces
        .filter((t) => t.active)
        .map((trace, index) => (
          <Float key={`particle-${index}`} speed={3} rotationIntensity={0} floatIntensity={0}>
            <mesh
              position={[
                trace.start.x + (trace.end.x - trace.start.x) * ((Date.now() / 1000 + index) % 1),
                trace.start.y + (trace.end.y - trace.start.y) * ((Date.now() / 1000 + index) % 1),
                0.2,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
            </mesh>
          </Float>
        ))}
    </group>
  )
}

export default function CircuitShowcase() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section id="circuit-showcase" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="h-[600px] bg-gray-900 rounded-2xl flex items-center justify-center">
          <div className="text-white">Loading Circuit Lab...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="circuit-showcase" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Interactive Circuit Lab
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore my electronic designs in 3D space. Hover over components to learn about their functionality and see
          real-time data flow visualization.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl"
      >
        <div className="h-[600px] relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} color="#00ff88" intensity={0.6} />
            <pointLight position={[10, -10, 10]} color="#0088ff" intensity={0.4} />

            <InteractiveCircuitBoard />

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={4}
              maxDistance={15}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>

          {/* Control Panel */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <h3 className="text-white font-bold mb-2">Circuit Controls</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Power: ON</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Data Flow: Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Sensors: Online</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-gray-600 max-w-xs">
            <h3 className="text-white font-bold mb-2">IoT Weather Station</h3>
            <p className="text-gray-300 text-sm">
              Real-time environmental monitoring system with wireless connectivity and cloud integration.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
      >
        {[
          {
            title: "Real-time Simulation",
            description: "Interactive 3D circuit visualization with live data flow",
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Component Library",
            description: "Extensive collection of electronic components and sensors",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "IoT Integration",
            description: "Seamless connectivity with cloud platforms and mobile apps",
            color: "from-purple-500 to-pink-500",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4 flex items-center justify-center`}
            >
              <div className="w-6 h-6 bg-white rounded-sm" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
