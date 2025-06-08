"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Text, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

// Enhanced Circuit component library with more components
const COMPONENT_LIBRARY = [
  {
    id: "resistor",
    name: "Resistor",
    category: "Passive",
    color: "#ff6b6b",
    description: "220Ω Carbon Film",
    pins: 2,
    size: [1.2, 0.3, 0.3],
  },
  {
    id: "capacitor",
    name: "Capacitor",
    category: "Passive",
    color: "#4ecdc4",
    description: "100μF Electrolytic",
    pins: 2,
    size: [0.4, 0.8, 0.4],
  },
  {
    id: "led",
    name: "LED",
    category: "Active",
    color: "#00d4ff",
    description: "5mm RGB LED",
    pins: 4,
    size: [0.3, 0.5, 0.3],
  },
  {
    id: "transistor",
    name: "Transistor",
    category: "Active",
    color: "#39ff14",
    description: "NPN BJT 2N2222",
    pins: 3,
    size: [0.4, 0.6, 0.2],
  },
  {
    id: "ic",
    name: "IC Chip",
    category: "Digital",
    color: "#7c3aed",
    description: "555 Timer IC",
    pins: 8,
    size: [1.0, 0.3, 0.6],
  },
  {
    id: "arduino",
    name: "Arduino Uno",
    category: "MCU",
    color: "#00d4ff",
    description: "ATmega328P Board",
    pins: 30,
    size: [2.7, 0.2, 2.1],
  },
  {
    id: "esp32",
    name: "ESP32",
    category: "MCU",
    color: "#ff0080",
    description: "WiFi & Bluetooth MCU",
    pins: 38,
    size: [1.8, 0.3, 2.5],
  },
  {
    id: "sensor_temp",
    name: "DHT22",
    category: "Sensors",
    color: "#39ff14",
    description: "Temperature & Humidity",
    pins: 4,
    size: [0.6, 0.8, 1.2],
  },
  {
    id: "sensor_ultrasonic",
    name: "HC-SR04",
    category: "Sensors",
    color: "#00d4ff",
    description: "Ultrasonic Distance",
    pins: 4,
    size: [1.8, 0.6, 0.8],
  },
  {
    id: "servo",
    name: "Servo Motor",
    category: "Actuators",
    color: "#ff6b6b",
    description: "SG90 Micro Servo",
    pins: 3,
    size: [1.2, 1.0, 2.3],
  },
  {
    id: "stepper",
    name: "Stepper Motor",
    category: "Actuators",
    color: "#7c3aed",
    description: "28BYJ-48 Stepper",
    pins: 5,
    size: [1.4, 1.4, 0.8],
  },
  {
    id: "relay",
    name: "Relay Module",
    category: "Control",
    color: "#ff0080",
    description: "5V Single Channel",
    pins: 3,
    size: [1.5, 0.8, 1.0],
  },
  {
    id: "display_oled",
    name: "OLED Display",
    category: "Display",
    color: "#00d4ff",
    description: "128x64 I2C OLED",
    pins: 4,
    size: [1.3, 0.2, 1.0],
  },
  {
    id: "display_lcd",
    name: "LCD 16x2",
    category: "Display",
    color: "#39ff14",
    description: "Character LCD",
    pins: 16,
    size: [3.2, 0.3, 1.2],
  },
  {
    id: "buzzer",
    name: "Buzzer",
    category: "Audio",
    color: "#ff6b6b",
    description: "Active Buzzer 5V",
    pins: 2,
    size: [0.6, 0.6, 0.4],
  },
  {
    id: "speaker",
    name: "Speaker",
    category: "Audio",
    color: "#7c3aed",
    description: "8Ω 0.5W Speaker",
    pins: 2,
    size: [1.0, 1.0, 0.3],
  },
  {
    id: "battery",
    name: "Battery Pack",
    category: "Power",
    color: "#ff0080",
    description: "9V Battery Holder",
    pins: 2,
    size: [2.0, 1.2, 0.8],
  },
  {
    id: "regulator",
    name: "Voltage Regulator",
    category: "Power",
    color: "#39ff14",
    description: "LM7805 5V Regulator",
    pins: 3,
    size: [0.8, 0.4, 0.6],
  },
]

function EnhancedDraggableComponent({ component, position, onDrag, onSelect, isSelected, isDragging }) {
  const meshRef = useRef()
  const { camera } = useThree()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (isDragging && meshRef.current) {
      // Enhanced dragging with smooth interpolation
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(meshRef.current)

      if (intersects.length > 0) {
        onDrag?.(intersects[0].point)
      }
    }
  })

  const renderComponent = () => {
    switch (component.id) {
      case "esp32":
        return (
          <group>
            <mesh>
              <boxGeometry args={component.size} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
              />
            </mesh>
            {/* WiFi antenna */}
            <mesh position={[0.8, 0.2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Bluetooth chip */}
            <mesh position={[-0.5, 0.2, 0.5]}>
              <boxGeometry args={[0.3, 0.1, 0.3]} />
              <meshStandardMaterial color="#0066CC" />
            </mesh>
          </group>
        )

      case "sensor_ultrasonic":
        return (
          <group>
            <mesh>
              <boxGeometry args={component.size} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
              />
            </mesh>
            {/* Ultrasonic sensors */}
            <mesh position={[-0.5, 0.4, 0.3]}>
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
            <mesh position={[0.5, 0.4, 0.3]}>
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
          </group>
        )

      case "servo":
        return (
          <group>
            <mesh>
              <boxGeometry args={component.size} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
              />
            </mesh>
            {/* Servo horn */}
            <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.8, 0.1, 0.1]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Servo shaft */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
              <meshStandardMaterial color="#C0C0C0" />
            </mesh>
          </group>
        )

      case "display_oled":
        return (
          <group>
            <mesh>
              <boxGeometry args={component.size} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
              />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[1.0, 0.05, 0.7]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Pixels simulation */}
            {Array.from({ length: 8 }).map((_, i) =>
              Array.from({ length: 6 }).map((_, j) => (
                <mesh key={`${i}-${j}`} position={[-0.4 + i * 0.1, 0.2, -0.25 + j * 0.1]}>
                  <boxGeometry args={[0.02, 0.01, 0.02]} />
                  <meshStandardMaterial
                    color={Math.random() > 0.7 ? "#00d4ff" : "#000000"}
                    emissive={Math.random() > 0.7 ? "#00d4ff" : "#000000"}
                    emissiveIntensity={0.5}
                  />
                </mesh>
              )),
            )}
          </group>
        )

      case "stepper":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[component.size[0] / 2, component.size[0] / 2, component.size[2], 16]} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
              />
            </mesh>
            {/* Stepper coils */}
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh key={i} position={[Math.cos((i * Math.PI) / 2) * 0.8, 0, Math.sin((i * Math.PI) / 2) * 0.8]}>
                <boxGeometry args={[0.3, 0.6, 0.2]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            ))}
          </group>
        )

      case "speaker":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[component.size[0] / 2, component.size[0] / 2, component.size[2], 16]} />
              <meshStandardMaterial
                color={component.color}
                emissive={component.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
              />
            </mesh>
            {/* Speaker cone */}
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.3, 0.2, 16]} />
              <meshStandardMaterial color="#2F2F2F" />
            </mesh>
            {/* Magnet */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
              <meshStandardMaterial color="#8B0000" />
            </mesh>
          </group>
        )

      default:
        return (
          <mesh>
            <boxGeometry args={component.size} />
            <meshStandardMaterial
              color={component.color}
              emissive={component.color}
              emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
            />
          </mesh>
        )
    }
  }

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.05}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect?.(component)}
      >
        {renderComponent()}

        {/* Enhanced component label */}
        <Text
          position={[0, -component.size[1] / 2 - 0.4, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="top"
          font="/fonts/Inter-Bold.ttf"
        >
          {component.name}
        </Text>

        {/* Enhanced selection indicator */}
        {isSelected && (
          <mesh>
            <boxGeometry args={[component.size[0] + 0.3, component.size[1] + 0.3, component.size[2] + 0.3]} />
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
          </mesh>
        )}

        {/* Enhanced hover info */}
        {hovered && (
          <Html position={[0, component.size[1] / 2 + 0.6, 0]} center>
            <div className="bg-black/90 text-white px-4 py-3 rounded-xl border border-electric text-sm whitespace-nowrap backdrop-blur-sm">
              <div className="font-bold text-electric">{component.name}</div>
              <div className="text-gray-300">{component.description}</div>
              <div className="text-quantum text-xs">Pins: {component.pins}</div>
            </div>
          </Html>
        )}

        {/* Connection points visualization */}
        {Array.from({ length: Math.min(component.pins, 8) }).map((_, i) => (
          <mesh
            key={i}
            position={[
              -component.size[0] / 2 + (i % 4) * (component.size[0] / 3),
              component.size[1] / 2 + 0.1,
              i < 4 ? component.size[2] / 2 : -component.size[2] / 2,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function EnhancedBreadboard() {
  return (
    <group position={[0, -1, 0]}>
      {/* Main breadboard */}
      <mesh>
        <boxGeometry args={[10, 0.3, 7]} />
        <meshStandardMaterial color="#2F4F2F" />
      </mesh>

      {/* Power rails */}
      <mesh position={[0, 0.2, 2.8]}>
        <boxGeometry args={[9, 0.1, 0.3]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
      <mesh position={[0, 0.2, -2.8]}>
        <boxGeometry args={[9, 0.1, 0.3]} />
        <meshStandardMaterial color="#0000FF" />
      </mesh>

      {/* Tie points with enhanced detail */}
      {Array.from({ length: 40 }).map((_, i) =>
        Array.from({ length: 80 }).map((_, j) => (
          <mesh key={`${i}-${j}`} position={[-4.5 + j * 0.12, 0.2, -3 + i * 0.15]}>
            <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
        )),
      )}

      {/* Connection strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-4 + i * 1.2, 0.25, 0]}>
          <boxGeometry args={[1.0, 0.05, 0.1]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      ))}
    </group>
  )
}

export default function CircuitBuilder() {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [placedComponents, setPlacedComponents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    "All",
    "Passive",
    "Active",
    "Digital",
    "MCU",
    "Sensors",
    "Actuators",
    "Display",
    "Audio",
    "Power",
    "Control",
  ]

  const filteredComponents =
    selectedCategory === "All"
      ? COMPONENT_LIBRARY
      : COMPONENT_LIBRARY.filter((comp) => comp.category === selectedCategory)

  const addComponent = useCallback((component) => {
    const newComponent = {
      ...component,
      id: `${component.id}-${Date.now()}`,
      position: [Math.random() * 6 - 3, 0, Math.random() * 4 - 2],
    }
    setPlacedComponents((prev) => [...prev, newComponent])
  }, [])

  const removeComponent = useCallback((componentId) => {
    setPlacedComponents((prev) => prev.filter((comp) => comp.id !== componentId))
  }, [])

  const clearBoard = useCallback(() => {
    setPlacedComponents([])
  }, [])

  if (!mounted) {
    return (
      <section id="circuit-builder" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="h-[700px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center">
          <div className="text-white text-xl">Loading Enhanced Circuit Builder...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="circuit-builder" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-6xl md:text-7xl font-bold mb-8">
          <span className="bg-gradient-to-r from-electric via-quantum to-neon bg-clip-text text-transparent">
            Quantum Circuit Lab
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Design and simulate advanced electronic circuits in immersive 3D space. Build everything from simple LEDs to
          complex IoT systems with our enhanced component library.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Component Library */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-electric/30 h-fit backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-electric rounded-full mr-3 animate-pulse"></span>
              Component Library
            </h3>

            {/* Enhanced Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    selectedCategory === category
                      ? "bg-electric text-black font-bold"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Enhanced Component List */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {filteredComponents.map((component) => (
                <motion.div
                  key={component.id}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addComponent(component)}
                  className="p-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-electric cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: component.color }} />
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm group-hover:text-electric transition-colors">
                        {component.name}
                      </div>
                      <div className="text-gray-400 text-xs">{component.description}</div>
                      <div className="text-quantum text-xs">Pins: {component.pins}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Controls */}
            <div className="mt-6 space-y-3">
              <button
                onClick={clearBoard}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg transition-all font-semibold"
              >
                Clear Board
              </button>
              <div className="text-sm text-gray-400 flex justify-between">
                <span>Components: {placedComponents.length}</span>
                <span>Categories: {categories.length - 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced 3D Circuit Board */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-electric/30 overflow-hidden backdrop-blur-sm"
          >
            <div className="h-[700px] relative">
              <Canvas camera={{ position: [0, 6, 10], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-5, 5, 5]} color="#00d4ff" intensity={0.8} />
                <pointLight position={[5, 5, -5]} color="#7c3aed" intensity={0.6} />
                <pointLight position={[0, 8, 0]} color="#39ff14" intensity={0.4} />

                <EnhancedBreadboard />

                {/* Enhanced Placed Components */}
                {placedComponents.map((component) => (
                  <EnhancedDraggableComponent
                    key={component.id}
                    component={component}
                    position={component.position}
                    isSelected={selectedComponent?.id === component.id}
                    onSelect={setSelectedComponent}
                    onDrag={(newPos) => {
                      setPlacedComponents((prev) =>
                        prev.map((comp) =>
                          comp.id === component.id ? { ...comp, position: [newPos.x, newPos.y, newPos.z] } : comp,
                        ),
                      )
                    }}
                  />
                ))}

                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  minDistance={4}
                  maxDistance={20}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>

              {/* Enhanced Instructions Overlay */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-electric/50 max-w-xs">
                <h4 className="text-electric font-bold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-electric rounded-full mr-2 animate-pulse"></span>
                  Quantum Builder
                </h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-neon rounded-full mr-2"></span>
                    Click components to materialize
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-quantum rounded-full mr-2"></span>
                    Drag to reposition in 3D space
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-cyber rounded-full mr-2"></span>
                    Rotate view with mouse
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-electric rounded-full mr-2"></span>
                    Scroll to zoom dimensions
                  </li>
                </ul>
              </div>

              {/* Enhanced Component Info */}
              {selectedComponent && (
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-electric/50 max-w-xs">
                  <h4 className="text-electric font-bold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-electric rounded-full mr-2 animate-pulse"></span>
                    {selectedComponent.name}
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">{selectedComponent.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-quantum">{selectedComponent.category}</span>
                    <span className="text-gray-400">Pins:</span>
                    <span className="text-neon">{selectedComponent.pins}</span>
                  </div>
                  <button
                    onClick={() => removeComponent(selectedComponent.id)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg text-sm transition-all font-semibold"
                  >
                    Dematerialize Component
                  </button>
                </div>
              )}

              {/* Circuit Status */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-neon/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon rounded-full animate-pulse"></div>
                  <span className="text-neon font-bold text-sm">QUANTUM ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Feature Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
      >
        {[
          {
            title: "Quantum Assembly",
            description: "Real-time 3D component placement with physics",
            icon: "⚛️",
            color: "from-electric to-quantum",
          },
          {
            title: "Neural Library",
            description: "18+ advanced electronic components",
            icon: "🧠",
            color: "from-quantum to-neon",
          },
          {
            title: "Holographic View",
            description: "Immersive 3D circuit visualization",
            icon: "🔮",
            color: "from-neon to-cyber",
          },
          {
            title: "Smart Connections",
            description: "Intelligent pin mapping and routing",
            icon: "🔗",
            color: "from-cyber to-electric",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-electric/50 transition-all duration-300 text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h4 className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
              {feature.title}
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
