"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text, Html, Stars } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

// Enhanced IoT device types with more variety
const IOT_DEVICE_TYPES = [
  {
    id: "smart_sensor",
    name: "Smart Sensor Hub",
    type: "sensor",
    color: "#00d4ff",
    description: "Multi-sensor environmental monitoring",
    metrics: { temp: "24°C", humidity: "65%", pressure: "1013 hPa" },
    size: [0.6, 0.6, 0.3],
  },
  {
    id: "edge_gateway",
    name: "Edge Gateway",
    type: "gateway",
    color: "#7c3aed",
    description: "5G/WiFi6 IoT Gateway with AI processing",
    metrics: { throughput: "1.2GB/s", latency: "< 1ms", devices: "250+" },
    size: [0.8, 0.5, 0.8],
  },
  {
    id: "smart_actuator",
    name: "Smart Actuator",
    type: "actuator",
    color: "#39ff14",
    description: "AI-controlled servo with feedback",
    metrics: { position: "45°", torque: "2.5Nm", speed: "180°/s" },
    size: [0.4, 0.8, 0.4],
  },
  {
    id: "holographic_display",
    name: "Holographic Display",
    type: "display",
    color: "#ff0080",
    description: "3D holographic projection system",
    metrics: { resolution: "4K", brightness: "5000 nits", fps: "120" },
    size: [1.0, 0.3, 0.8],
  },
  {
    id: "quantum_processor",
    name: "Quantum Processor",
    type: "compute",
    color: "#00d4ff",
    description: "Quantum computing edge device",
    metrics: { qubits: "16", coherence: "100μs", fidelity: "99.9%" },
    size: [0.7, 0.7, 0.7],
  },
  {
    id: "neural_camera",
    name: "Neural Camera",
    type: "vision",
    color: "#ff0080",
    description: "AI-powered computer vision system",
    metrics: { resolution: "8K", fps: "240", accuracy: "99.7%" },
    size: [0.5, 0.3, 0.8],
  },
  {
    id: "wireless_charger",
    name: "Wireless Charger",
    type: "power",
    color: "#39ff14",
    description: "Qi wireless charging pad with efficiency monitoring",
    metrics: { power: "15W", efficiency: "92%", temp: "35°C" },
    size: [0.8, 0.1, 0.8],
  },
  {
    id: "mesh_node",
    name: "Mesh Network Node",
    type: "network",
    color: "#7c3aed",
    description: "Self-healing mesh network repeater",
    metrics: { range: "500m", nodes: "50+", uptime: "99.9%" },
    size: [0.3, 0.3, 0.3],
  },
]

function EnhancedIoTDevice({ device, position, isActive, onHover, onSelect, isSelected }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (meshRef.current && mounted) {
      meshRef.current.rotation.y += 0.005
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      }

      // Add pulsing effect for selected devices
      if (isSelected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  const getDeviceGeometry = () => {
    switch (device.type) {
      case "sensor":
        return <cylinderGeometry args={[device.size[0], device.size[0], device.size[1], 12]} />
      case "gateway":
        return <boxGeometry args={device.size} />
      case "actuator":
        return <coneGeometry args={[device.size[0], device.size[1], 8]} />
      case "display":
        return <boxGeometry args={device.size} />
      case "compute":
        return <octahedronGeometry args={[device.size[0], 2]} />
      case "vision":
        return <sphereGeometry args={[device.size[0], 16, 16]} />
      case "power":
        return <cylinderGeometry args={[device.size[0], device.size[0], device.size[1], 16]} />
      case "network":
        return <dodecahedronGeometry args={[device.size[0], 0]} />
      default:
        return <sphereGeometry args={[device.size[0], 16, 16]} />
    }
  }

  const getDeviceColor = () => {
    return isActive ? device.color : "#1a1a2e"
  }

  const renderDeviceSpecifics = () => {
    switch (device.type) {
      case "gateway":
        return (
          <group>
            {/* Antenna array */}
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh key={i} position={[(-1.5 + i) * 0.3, device.size[1] / 2 + 0.2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#FFD700" />
              </mesh>
            ))}
            {/* Status LEDs */}
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} position={[-0.3 + i * 0.1, device.size[1] / 2 + 0.05, device.size[2] / 2]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial
                  color={isActive && Math.random() > 0.3 ? "#00ff00" : "#ff0000"}
                  emissive={isActive && Math.random() > 0.3 ? "#00ff00" : "#ff0000"}
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
          </group>
        )

      case "vision":
        return (
          <group>
            {/* Camera lens */}
            <mesh position={[0, 0, device.size[2] / 2 + 0.1]}>
              <cylinderGeometry args={[0.2, 0.15, 0.2, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Lens glass */}
            <mesh position={[0, 0, device.size[2] / 2 + 0.2]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
          </group>
        )

      case "compute":
        return (
          <group>
            {/* Quantum cooling fins */}
            {Array.from({ length: 6 }).map((_, i) => (
              <mesh key={i} position={[0, 0, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.05]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
              </mesh>
            ))}
          </group>
        )

      default:
        return null
    }
  }

  if (!mounted) return null

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.1}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover?.(device)
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover?.(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(device)
        }}
      >
        <mesh>
          {getDeviceGeometry()}
          <meshStandardMaterial
            color={getDeviceColor()}
            emissive={getDeviceColor()}
            emissiveIntensity={isActive ? 0.4 : 0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {renderDeviceSpecifics()}

        {/* Enhanced status indicator */}
        <mesh position={[0, device.size[1] / 2 + 0.3, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={isActive ? "#00ff00" : "#ff0000"}
            emissive={isActive ? "#00ff00" : "#ff0000"}
            emissiveIntensity={1}
          />
        </mesh>

        {/* Device label */}
        <Text
          position={[0, -device.size[1] / 2 - 0.4, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
        >
          {device.name}
        </Text>

        {/* Enhanced hover info */}
        {hovered && (
          <Html position={[0, device.size[1] / 2 + 0.8, 0]} center>
            <div className="bg-black/90 text-white p-4 rounded-xl border border-electric text-sm whitespace-nowrap backdrop-blur-sm max-w-xs">
              <div className="font-bold text-electric mb-2">{device.name}</div>
              <div className="text-gray-300 mb-3">{device.description}</div>
              <div className="grid grid-cols-1 gap-1">
                {Object.entries(device.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="text-quantum font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Html>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[device.size[0] * 1.5, 16, 16]} />
            <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
          </mesh>
        )}

        {/* Data transmission effect */}
        {isActive && (
          <group>
            {Array.from({ length: 3 }).map((_, i) => (
              <mesh key={i} position={[0, device.size[1] / 2 + 0.5 + i * 0.3, 0]}>
                <sphereGeometry args={[0.05 + i * 0.02, 8, 8]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.8 - i * 0.2} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  )
}

function EnhancedDataFlow({ start, end, active, type = "data" }) {
  const [mounted, setMounted] = useState(false)
  const lineRef = useRef()

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (lineRef.current && mounted && active) {
      lineRef.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  const points = useMemo(() => {
    if (!mounted) return []
    try {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...start),
        new THREE.Vector3(
          (start[0] + end[0]) / 2,
          Math.max(start[1], end[1]) + 2 + Math.random() * 2,
          (start[2] + end[2]) / 2,
        ),
        new THREE.Vector3(...end),
      )
      return curve.getPoints(50)
    } catch (error) {
      console.warn("Error creating enhanced curve:", error)
      return []
    }
  }, [start, end, mounted])

  const getFlowColor = () => {
    switch (type) {
      case "power":
        return "#39ff14"
      case "control":
        return "#ff0080"
      case "video":
        return "#7c3aed"
      default:
        return "#00d4ff"
    }
  }

  if (!mounted || points.length === 0) return null

  return (
    <group>
      <mesh ref={lineRef}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 64, 0.03, 8, false]} />
        <meshStandardMaterial
          color={active ? getFlowColor() : "#333333"}
          emissive={active ? getFlowColor() : "#000000"}
          emissiveIntensity={active ? 0.6 : 0}
          transparent
          opacity={active ? 0.8 : 0.2}
        />
      </mesh>

      {/* Data packets */}
      {active &&
        Array.from({ length: 3 }).map((_, i) => (
          <Float key={i} speed={4 + i} rotationIntensity={0} floatIntensity={0}>
            <mesh
              position={[
                start[0] + (end[0] - start[0]) * ((Date.now() / 1000 + i * 0.3) % 1),
                start[1] + (end[1] - start[1]) * ((Date.now() / 1000 + i * 0.3) % 1) + 1,
                start[2] + (end[2] - start[2]) * ((Date.now() / 1000 + i * 0.3) % 1),
              ]}
            >
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial color={getFlowColor()} emissive={getFlowColor()} emissiveIntensity={0.8} />
            </mesh>
          </Float>
        ))}
    </group>
  )
}

function QuantumCloudServer() {
  const cloudRef = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (cloudRef.current && mounted) {
      cloudRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      cloudRef.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })

  if (!mounted) return null

  return (
    <group ref={cloudRef} position={[0, 5, 0]}>
      {/* Main cloud structure */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>

      {/* Quantum processing cores */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh
            position={[
              Math.cos((i * Math.PI * 2) / 8) * 1.2,
              Math.sin((i * Math.PI * 2) / 8) * 0.5,
              Math.sin((i * Math.PI * 2) / 8) * 1.2,
            ]}
          >
            <octahedronGeometry args={[0.15, 1]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} />
          </mesh>
        </Float>
      ))}

      {/* Data streams */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 2,
            Math.sin(Date.now() / 1000 + i) * 0.5,
            Math.sin((i * Math.PI * 2) / 12) * 2,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={1} />
        </mesh>
      ))}

      <Text position={[0, -2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        Quantum Cloud Matrix
      </Text>
    </group>
  )
}

export default function IoTLab() {
  const [hoveredDevice, setHoveredDevice] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [activeDevices, setActiveDevices] = useState(new Set([0, 1, 2, 3, 4, 5, 6, 7]))
  const [mounted, setMounted] = useState(false)
  const [networkMode, setNetworkMode] = useState("mesh") // mesh, star, hybrid

  useEffect(() => {
    setMounted(true)
  }, [])

  const devices = useMemo(
    () =>
      IOT_DEVICE_TYPES.map((device, index) => ({
        ...device,
        id: index,
        position: [
          Math.cos((index * Math.PI * 2) / IOT_DEVICE_TYPES.length) * 4,
          Math.sin(index * 0.5) * 2,
          Math.sin((index * Math.PI * 2) / IOT_DEVICE_TYPES.length) * 4,
        ],
      })),
    [],
  )

  const connections = useMemo(() => {
    const conns = []

    if (networkMode === "mesh") {
      // Mesh network - devices connect to nearby devices
      devices.forEach((device, i) => {
        devices.forEach((otherDevice, j) => {
          if (i !== j && Math.random() > 0.6) {
            conns.push({
              from: device.position,
              to: otherDevice.position,
              type: device.type === "power" ? "power" : "data",
              active: activeDevices.has(i) && activeDevices.has(j),
            })
          }
        })
      })
    } else if (networkMode === "star") {
      // Star network - all devices connect to gateway
      const gateway = devices.find((d) => d.type === "gateway")
      if (gateway) {
        devices.forEach((device) => {
          if (device.type !== "gateway") {
            conns.push({
              from: device.position,
              to: gateway.position,
              type: "data",
              active: activeDevices.has(device.id) && activeDevices.has(gateway.id),
            })
          }
        })
      }
    }

    // All devices connect to cloud
    devices.forEach((device) => {
      conns.push({
        from: device.position,
        to: [0, 5, 0], // Cloud position
        type: device.type === "gateway" ? "control" : "data",
        active: activeDevices.has(device.id),
      })
    })

    return conns
  }, [devices, networkMode, activeDevices])

  const toggleDevice = (deviceId) => {
    setActiveDevices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(deviceId)) {
        newSet.delete(deviceId)
      } else {
        newSet.add(deviceId)
      }
      return newSet
    })
  }

  const toggleAllDevices = () => {
    if (activeDevices.size === devices.length) {
      setActiveDevices(new Set())
    } else {
      setActiveDevices(new Set(devices.map((d) => d.id)))
    }
  }

  if (!mounted) {
    return (
      <section id="iot-lab" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center">
          <div className="text-white text-xl">Loading Enhanced IoT Lab...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="iot-lab" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-6xl md:text-7xl font-bold mb-8">
          <span className="bg-gradient-to-r from-electric via-quantum to-neon bg-clip-text text-transparent">
            Quantum IoT Ecosystem
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Experience next-generation IoT networks with quantum computing integration, neural processing, and holographic
          interfaces in real-time 3D simulation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced 3D Visualization */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-electric/30 overflow-hidden backdrop-blur-sm"
          >
            <div className="h-[600px] relative">
              <Canvas camera={{ position: [0, 4, 12], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={0.8} />
                <pointLight position={[10, -10, 10]} color="#7c3aed" intensity={0.6} />
                <pointLight position={[0, 15, 0]} color="#39ff14" intensity={0.4} />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                {/* Enhanced IoT Devices */}
                {devices.map((device) => (
                  <EnhancedIoTDevice
                    key={device.id}
                    device={device}
                    position={device.position}
                    isActive={activeDevices.has(device.id)}
                    isSelected={selectedDevice?.id === device.id}
                    onHover={setHoveredDevice}
                    onSelect={setSelectedDevice}
                  />
                ))}

                {/* Enhanced Data Flow Connections */}
                {connections.map((connection, index) => (
                  <EnhancedDataFlow
                    key={index}
                    start={connection.from}
                    end={connection.to}
                    active={connection.active}
                    type={connection.type}
                  />
                ))}

                {/* Quantum Cloud Server */}
                <QuantumCloudServer />

                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  minDistance={6}
                  maxDistance={20}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>

              {/* Enhanced Network Status */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-electric/50">
                <h3 className="text-electric font-bold mb-3 flex items-center">
                  <span className="w-2 h-2 bg-electric rounded-full mr-2 animate-pulse"></span>
                  Quantum Network
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                    <span className="text-gray-300">Topology: {networkMode.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-quantum rounded-full animate-pulse" />
                    <span className="text-gray-300">Quantum Core: Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber rounded-full animate-pulse" />
                    <span className="text-gray-300">
                      Devices: {activeDevices.size}/{devices.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Network Mode Selector */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-quantum/50">
                <h4 className="text-quantum font-bold mb-2 text-sm">Network Topology</h4>
                <div className="flex gap-2">
                  {["mesh", "star", "hybrid"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setNetworkMode(mode)}
                      className={`px-2 py-1 rounded text-xs transition-all ${
                        networkMode === mode ? "bg-quantum text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Control Panel */}
        <div className="space-y-6">
          {/* Master Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-electric/30 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-electric rounded-full mr-3 animate-pulse"></span>
              Quantum Controls
            </h3>

            <div className="space-y-4">
              <button
                onClick={toggleAllDevices}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  activeDevices.size === devices.length
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                    : "bg-gradient-to-r from-electric to-quantum hover:from-neon hover:to-cyber text-white"
                }`}
              >
                {activeDevices.size === devices.length ? "Shutdown All" : "Activate All"}
              </button>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-electric font-bold">{activeDevices.size}</div>
                  <div className="text-gray-400">Active Nodes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-quantum font-bold">{connections.filter((c) => c.active).length}</div>
                  <div className="text-gray-400">Data Streams</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Device Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-quantum/30 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-quantum rounded-full mr-3 animate-pulse"></span>
              Device Matrix
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedDevice?.id === device.id
                      ? "bg-electric/20 border-electric"
                      : "bg-gray-800 border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedDevice(selectedDevice?.id === device.id ? null : device)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activeDevices.has(device.id) ? "bg-neon animate-pulse" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="text-white font-medium text-sm">{device.name}</div>
                        <div className="text-gray-400 text-xs">{device.type}</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleDevice(device.id)
                      }}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        activeDevices.has(device.id)
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-neon hover:bg-green-600 text-black hover:text-white"
                      }`}
                    >
                      {activeDevices.has(device.id) ? "Stop" : "Start"}
                    </button>
                  </div>

                  {selectedDevice?.id === device.id && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-2">Real-time Metrics:</div>
                      <div className="grid grid-cols-1 gap-1">
                        {Object.entries(device.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="text-electric font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Device Info */}
          {hoveredDevice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-neon/50 backdrop-blur-sm"
            >
              <h3 className="text-neon font-bold mb-2 flex items-center">
                <span className="w-2 h-2 bg-neon rounded-full mr-2 animate-pulse"></span>
                {hoveredDevice.name}
              </h3>
              <p className="text-gray-300 mb-3 text-sm">{hoveredDevice.description}</p>
              <div className="space-y-2">
                {Object.entries(hoveredDevice.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="text-electric font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced System Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-cyber/30 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-cyber rounded-full mr-3 animate-pulse"></span>
              System Analytics
            </h3>

            <div className="space-y-4">
              {[
                { label: "Quantum Throughput", value: "2.4 TB/s", color: "text-electric", trend: "+15%" },
                { label: "Neural Latency", value: "< 0.1ms", color: "text-neon", trend: "-23%" },
                { label: "Network Uptime", value: "99.99%", color: "text-quantum", trend: "+0.01%" },
                { label: "Power Efficiency", value: "1.2kW", color: "text-cyber", trend: "-8%" },
                { label: "AI Processing", value: "847 TOPS", color: "text-electric", trend: "+42%" },
                { label: "Security Level", value: "Quantum", color: "text-neon", trend: "MAX" },
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{metric.label}</span>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${metric.color}`}>{metric.value}</span>
                    <div className="text-xs text-gray-500">{metric.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Quantum Edge",
            description: "16-qubit quantum processors at network edge",
            icon: "⚛️",
            color: "from-electric to-quantum",
            metrics: "16 qubits, 99.9% fidelity",
          },
          {
            title: "Neural Mesh",
            description: "Self-healing AI-powered mesh networks",
            icon: "🧠",
            color: "from-quantum to-neon",
            metrics: "500m range, <1ms latency",
          },
          {
            title: "Holographic UI",
            description: "3D holographic device interfaces",
            icon: "🔮",
            color: "from-neon to-cyber",
            metrics: "4K resolution, 120fps",
          },
          {
            title: "Zero Trust",
            description: "Quantum-encrypted security protocols",
            icon: "🔒",
            color: "from-cyber to-electric",
            metrics: "AES-256, quantum-resistant",
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
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-3 text-sm">
              {feature.description}
            </p>
            <div className="text-xs text-gray-500 font-mono">{feature.metrics}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
