"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Line, Html, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

const componentTypes = [
  { id: "resistor", name: "Resistor", color: "#ff5555", value: "220Ω" },
  { id: "capacitor", name: "Capacitor", color: "#5555ff", value: "10μF" },
  { id: "led", name: "LED", color: "#55ff55", value: "Green" },
  { id: "transistor", name: "Transistor", color: "#ffaa55", value: "NPN" },
  { id: "ic", name: "IC Chip", color: "#aa55ff", value: "555 Timer" },
  { id: "battery", name: "Battery", color: "#ffff55", value: "9V" },
]

function CircuitComponent({ type, position, rotation, onSelect, isSelected, onMove }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  const componentData = componentTypes.find((c) => c.id === type) || componentTypes[0]

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onSelect()
  }

  useFrame((state) => {
    if (isSelected && mesh.current) {
      const vector = new THREE.Vector3()
      const pos = new THREE.Vector3()

      vector.set(state.mouse.x, state.mouse.y, 0.5)
      vector.unproject(camera)
      vector.sub(camera.position).normalize()

      const distance = -camera.position.z / vector.z
      pos.copy(camera.position).add(vector.multiplyScalar(distance))

      pos.y = Math.max(-5, Math.min(5, pos.y))
      pos.x = Math.max(-8, Math.min(8, pos.x))
      pos.z = 0

      mesh.current.position.lerp(pos, 0.2)
      onMove(mesh.current.position.clone())
    }
  })

  const renderComponent = () => {
    switch (type) {
      case "resistor":
        return (
          <group>
            <mesh>
              <boxGeometry args={[1.5, 0.4, 0.4]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <Line
              points={[
                [-1, 0, 0],
                [-2, 0, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [1, 0, 0],
                [2, 0, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
          </group>
        )
      case "capacitor":
        return (
          <group>
            <mesh position={[-0.25, 0, 0]}>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <mesh position={[0.25, 0, 0]}>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <Line
              points={[
                [-0.25, 0, 0],
                [-2, 0, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [0.25, 0, 0],
                [2, 0, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
          </group>
        )
      case "led":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
              />
            </mesh>
            <Line
              points={[
                [0, -0.5, 0],
                [0, -1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [0, 0.5, 0],
                [0, 1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
          </group>
        )
      case "transistor":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 16]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <Line
              points={[
                [0, -0.5, 0],
                [0, -1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [0, 0.5, 0],
                [0, 1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [0.5, 0, 0],
                [1.5, 0, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
          </group>
        )
      case "ic":
        return (
          <group>
            <mesh>
              <boxGeometry args={[1.5, 0.3, 1]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
          </group>
        )
      case "battery":
        return (
          <group>
            <mesh position={[-0.4, 0, 0]}>
              <boxGeometry args={[0.2, 1, 0.5]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <mesh position={[0.4, 0, 0]}>
              <boxGeometry args={[0.6, 1.4, 0.5]} />
              <meshStandardMaterial
                color={componentData.color}
                emissive={componentData.color}
                emissiveIntensity={hovered || isSelected ? 0.3 : 0}
              />
            </mesh>
            <Line
              points={[
                [-0.4, -0.7, 0],
                [-0.4, -1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
            <Line
              points={[
                [0.4, 0.7, 0],
                [0.4, 1.5, 0],
              ]}
              color="gray"
              lineWidth={3}
            />
          </group>
        )
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={componentData.color}
              emissive={componentData.color}
              emissiveIntensity={hovered || isSelected ? 0.3 : 0}
            />
          </mesh>
        )
    }
  }

  return (
    <group
      ref={mesh}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {renderComponent()}

      {(hovered || isSelected) && (
        <Html position={[0, -1.5, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {componentData.name} ({componentData.value})
          </div>
        </Html>
      )}

      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial color="#8b5cf6" wireframe={true} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}

function Connection({ start, end, active = false }) {
  return <Line points={[start, end]} color={active ? "#8b5cf6" : "#555555"} lineWidth={2} />
}

function Grid() {
  return (
    <group position={[0, 0, -0.1]}>
      {Array.from({ length: 21 }).map((_, i) => (
        <Line
          key={`h-${i}`}
          points={[
            [-10, -5 + i * 0.5, 0],
            [10, -5 + i * 0.5, 0],
          ]}
          color="#333333"
          lineWidth={i % 2 === 0 ? 1 : 0.5}
        />
      ))}
      {Array.from({ length: 41 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[
            [-10 + i * 0.5, -5, 0],
            [-10 + i * 0.5, 5, 0],
          ]}
          color="#333333"
          lineWidth={i % 2 === 0 ? 1 : 0.5}
        />
      ))}
    </group>
  )
}

function CircuitStatus({ isActive }) {
  return (
    <group position={[8, 4.5, 0]}>
      <Text position={[-1.5, 0, 0]} fontSize={0.4} color="white" anchorX="right" anchorY="middle">
        Circuit Status:
      </Text>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#55ff55" : "#ff5555"}
          emissive={isActive ? "#55ff55" : "#ff5555"}
          emissiveIntensity={0.8}
        />
      </mesh>
      <Text
        position={[1, 0, 0]}
        fontSize={0.4}
        color={isActive ? "#55ff55" : "#ff5555"}
        anchorX="left"
        anchorY="middle"
      >
        {isActive ? "ACTIVE" : "INACTIVE"}
      </Text>
    </group>
  )
}

export default function InteractiveCircuit() {
  const [components, setComponents] = useState([
    { id: 1, type: "battery", position: new THREE.Vector3(-5, 0, 0), rotation: [0, 0, 0] },
    { id: 2, type: "resistor", position: new THREE.Vector3(-2, 2, 0), rotation: [0, 0, 0] },
    { id: 3, type: "led", position: new THREE.Vector3(2, 0, 0), rotation: [0, 0, 0] },
    { id: 4, type: "capacitor", position: new THREE.Vector3(0, -2, 0), rotation: [0, 0, 0] },
  ])

  const [connections, setConnections] = useState([
    { id: 1, from: 1, to: 2 },
    { id: 2, from: 2, to: 3 },
    { id: 3, from: 3, to: 4 },
    { id: 4, from: 4, to: 1 },
  ])

  const [selectedComponent, setSelectedComponent] = useState(null)
  const [activeComponentType, setActiveComponentType] = useState("resistor")
  const [circuitActive, setCircuitActive] = useState(true)

  const addComponent = () => {
    const newId = components.length > 0 ? Math.max(...components.map((c) => c.id)) + 1 : 1

    setComponents([
      ...components,
      {
        id: newId,
        type: activeComponentType,
        position: new THREE.Vector3(0, 0, 0),
        rotation: [0, 0, 0],
      },
    ])

    setSelectedComponent(newId)
  }

  const removeComponent = () => {
    if (!selectedComponent) return

    setComponents(components.filter((c) => c.id !== selectedComponent))
    setConnections(connections.filter((c) => c.from !== selectedComponent && c.to !== selectedComponent))
    setSelectedComponent(null)
  }

  const updateComponentPosition = (id, position) => {
    setComponents(components.map((c) => (c.id === id ? { ...c, position } : c)))
  }

  const toggleCircuit = () => {
    setCircuitActive(!circuitActive)
  }

  return (
    <section id="circuit-designer" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Interactive Circuit Designer
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Design and simulate electronic circuits in 3D space. Drag components to position them.
        </p>
      </motion.div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {componentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveComponentType(type.id)}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeComponentType === type.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={addComponent}
              className="px-3 py-1 rounded-md text-sm bg-green-600 text-white hover:bg-green-700"
            >
              Add Component
            </button>
            <button
              onClick={removeComponent}
              disabled={!selectedComponent}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedComponent
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Remove
            </button>
            <button
              onClick={toggleCircuit}
              className={`px-3 py-1 rounded-md text-sm ${
                circuitActive
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {circuitActive ? "Stop Simulation" : "Start Simulation"}
            </button>
          </div>
        </div>

        <div className="h-[600px]">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />

            <Grid />
            <CircuitStatus isActive={circuitActive} />

            {connections.map((connection) => {
              const fromComponent = components.find((c) => c.id === connection.from)
              const toComponent = components.find((c) => c.id === connection.to)

              if (!fromComponent || !toComponent) return null

              return (
                <Connection
                  key={connection.id}
                  start={fromComponent.position}
                  end={toComponent.position}
                  active={circuitActive}
                />
              )
            })}

            {components.map((component) => (
              <CircuitComponent
                key={component.id}
                type={component.type}
                position={component.position}
                rotation={component.rotation}
                isSelected={selectedComponent === component.id}
                onSelect={() => setSelectedComponent(component.id === selectedComponent ? null : component.id)}
                onMove={(position) => updateComponentPosition(component.id, position)}
              />
            ))}

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          <p>
            <strong>Instructions:</strong> Click on components to select them. When selected, components will follow
            your mouse. Use the buttons above to add new components.
          </p>
        </div>
      </div>
    </section>
  )
}
