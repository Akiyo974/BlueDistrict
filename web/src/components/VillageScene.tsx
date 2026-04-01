"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { FlyControls, OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { AdditiveBlending, DoubleSide, MeshStandardMaterial } from "three";

type Building = {
  x: number;
  z: number;
  h: number;
  w: number;
  d: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
};

const COLORS = ["#0A66C2", "#0F4E8A", "#1B87DB", "#0E3C6C", "#4CC9FF"];
const CITY_SIZE = 32;
const ROAD_STEP = 4;

function RoadGrid({ size }: { size: number }) {
  const lineMaterials = useRef<MeshStandardMaterial[]>([]);

  const roadLines = useMemo(() => {
    const lines: number[] = [];
    for (let p = -size / 2; p <= size / 2; p += ROAD_STEP) {
      lines.push(p);
    }
    return lines;
  }, [size]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < lineMaterials.current.length; i += 1) {
      const mat = lineMaterials.current[i];
      if (!mat) {
        continue;
      }

      const pulse = 0.45 + 0.35 * Math.sin(t * 2.2 + i * 0.7);
      mat.emissiveIntensity = Math.max(0.1, pulse);
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[size + 8, size + 8]} />
        <meshStandardMaterial color="#0B1628" roughness={0.95} metalness={0.05} />
      </mesh>

      {roadLines.map((x) => (
        <group key={`road-x-${x}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.015, 0]} receiveShadow>
            <planeGeometry args={[1.4, size + 8]} />
            <meshStandardMaterial color="#1A2B40" roughness={0.82} metalness={0.1} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x - 0.8, 0.02, 0]} receiveShadow>
            <planeGeometry args={[0.25, size + 8]} />
            <meshStandardMaterial color="#7CA2C7" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x + 0.8, 0.02, 0]} receiveShadow>
            <planeGeometry args={[0.25, size + 8]} />
            <meshStandardMaterial color="#7CA2C7" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.025, 0]}>
            <planeGeometry args={[0.06, size + 8]} />
            <meshStandardMaterial
              ref={(mat) => {
                if (mat) {
                  const index = roadLines.indexOf(x);
                  lineMaterials.current[index] = mat;
                }
              }}
              color="#8BD4FF"
              emissive="#4CC9FF"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}

      {roadLines.map((z) => (
        <group key={`road-z-${z}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, z]} receiveShadow>
            <planeGeometry args={[size + 8, 1.4]} />
            <meshStandardMaterial color="#1A2B40" roughness={0.82} metalness={0.1} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z - 0.8]} receiveShadow>
            <planeGeometry args={[size + 8, 0.25]} />
            <meshStandardMaterial color="#7CA2C7" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z + 0.8]} receiveShadow>
            <planeGeometry args={[size + 8, 0.25]} />
            <meshStandardMaterial color="#7CA2C7" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, z]}>
            <planeGeometry args={[size + 8, 0.06]} />
            <meshStandardMaterial
              ref={(mat) => {
                if (mat) {
                  const index = roadLines.length + roadLines.indexOf(z);
                  lineMaterials.current[index] = mat;
                }
              }}
              color="#8BD4FF"
              emissive="#4CC9FF"
              emissiveIntensity={0.55}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RoadSignals({ size }: { size: number }) {
  const materials = useRef<MeshStandardMaterial[]>([]);

  const points = useMemo(() => {
    const positions: Array<{ x: number; z: number; phase: number }> = [];
    let phase = 0;

    for (let x = -size / 2; x <= size / 2; x += ROAD_STEP) {
      for (let z = -size / 2; z <= size / 2; z += ROAD_STEP) {
        positions.push({ x: x + 0.52, z: z - 0.52, phase });
        phase += 0.55;
      }
    }

    return positions;
  }, [size]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < materials.current.length; i += 1) {
      const mat = materials.current[i];
      const point = points[i];

      if (!mat || !point) {
        continue;
      }

      const pulse = 0.45 + 0.55 * Math.sin(t * 3.2 + point.phase);
      mat.emissiveIntensity = Math.max(0.15, pulse);
    }
  });

  return (
    <group>
      {points.map((point, index) => (
        <mesh key={`signal-${index}`} position={[point.x, 0.14, point.z]} castShadow>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial
            ref={(mat) => {
              if (mat) {
                materials.current[index] = mat;
              }
            }}
            color={index % 2 === 0 ? "#7AE0FF" : "#4CC9FF"}
            emissive={index % 2 === 0 ? "#7AE0FF" : "#4CC9FF"}
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function VolumetricMist() {
  const materials = useRef<MeshStandardMaterial[]>([]);

  const layers = useMemo(
    () => [
      { y: 0.45, size: 58, phase: 0.1, speed: 0.22 },
      { y: 0.9, size: 52, phase: 1.2, speed: 0.18 },
      { y: 1.35, size: 44, phase: 2.1, speed: 0.14 },
    ],
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    for (let i = 0; i < materials.current.length; i += 1) {
      const mat = materials.current[i];
      const layer = layers[i];

      if (!mat || !layer) {
        continue;
      }

      mat.opacity = 0.05 + 0.03 * (0.5 + 0.5 * Math.sin(t * layer.speed + layer.phase));
      mat.emissiveIntensity = 0.12 + 0.08 * Math.sin(t * layer.speed + layer.phase * 1.3);
    }
  });

  return (
    <group>
      {layers.map((layer, index) => (
        <mesh
          key={`mist-${index}`}
          rotation={[-Math.PI / 2, 0, layer.phase]}
          position={[0, layer.y, 0]}
        >
          <planeGeometry args={[layer.size, layer.size]} />
          <meshStandardMaterial
            ref={(mat) => {
              if (mat) {
                materials.current[index] = mat;
              }
            }}
            color="#7FD5FF"
            emissive="#4CC9FF"
            emissiveIntensity={0.12}
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function CityBuildings({ buildings }: { buildings: Building[] }) {
  const windowMaterials = useRef<MeshStandardMaterial[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    for (let i = 0; i < windowMaterials.current.length; i += 1) {
      const mat = windowMaterials.current[i];
      const building = buildings[i];

      if (!mat || !building) {
        continue;
      }

      const fast = Math.sin(t * building.pulseSpeed + building.pulsePhase);
      const slow = Math.sin(t * (building.pulseSpeed * 0.45) + building.pulsePhase * 2.1);
      const flicker = 0.45 + 0.3 * fast + 0.2 * slow;
      mat.emissiveIntensity = Math.max(0.12, flicker);
    }
  });

  return (
    <>
      {buildings.map((b, index) => (
        <group key={index} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.35}
              metalness={0.45}
              emissive="#0A66C2"
              emissiveIntensity={0.1}
            />
          </mesh>
          <mesh position={[0, b.h / 2 + 0.05, 0]} castShadow>
            <boxGeometry args={[b.w * 0.88, 0.1, b.d * 0.88]} />
            <meshStandardMaterial color="#CDE8FF" emissive="#8BC9FF" emissiveIntensity={0.3} />
          </mesh>

          <mesh position={[0, 0, b.d / 2 + 0.018]}>
            <boxGeometry args={[b.w * 0.8, b.h * 0.78, 0.03]} />
            <meshStandardMaterial
              ref={(mat) => {
                if (mat) {
                  windowMaterials.current[index] = mat;
                }
              }}
              color="#BEE8FF"
              emissive="#8BD4FF"
              emissiveIntensity={0.35}
              roughness={0.22}
              metalness={0.35}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function createCity(seed: number, size = CITY_SIZE) {
  const buildings: Building[] = [];
  let s = seed;

  const random = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let gx = -size / 2; gx < size / 2; gx += 1) {
    for (let gz = -size / 2; gz < size / 2; gz += 1) {
      if (gx % 4 === 0 || gz % 4 === 0) {
        continue;
      }

      const h = 0.9 + random() * 4.8;
      const w = 0.55 + random() * 0.4;
      const d = 0.55 + random() * 0.4;
      const color = COLORS[Math.floor(random() * COLORS.length)];
      const pulseSpeed = 1 + random() * 2.2;
      const pulsePhase = random() * Math.PI * 2;

      buildings.push({
        x: gx + (random() - 0.5) * 0.2,
        z: gz + (random() - 0.5) * 0.2,
        h,
        w,
        d,
        color,
        pulseSpeed,
        pulsePhase,
      });
    }
  }

  return buildings;
}

type VillageSceneProps = {
  className?: string;
  exploreMode?: boolean;
};

export default function VillageScene({ className, exploreMode = false }: VillageSceneProps) {
  const buildings = useMemo(() => createCity(42), []);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-[#060F1D] ${className ?? ""}`.trim()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(76,201,255,0.25),rgba(0,0,0,0)_42%)]" />
      <Canvas
        camera={{ position: [14, 12, 16], fov: 44 }}
        shadows
        dpr={[1, 1.7]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#050B17"]} />
        <fog attach="fog" args={["#050B17", 12, 58]} />

        <ambientLight intensity={0.3} color="#5DA8FF" />
        <hemisphereLight intensity={0.4} groundColor="#030912" color="#4CC9FF" />
        <directionalLight
          position={[10, 16, 7]}
          intensity={1.5}
          color="#D6EBFF"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 7, 0]} intensity={1.2} color="#2AA4FF" />

        <Stars radius={70} depth={40} count={1200} factor={2} saturation={0} fade speed={0.25} />

        <RoadGrid size={CITY_SIZE} />
        <RoadSignals size={CITY_SIZE} />
        <VolumetricMist />

        <CityBuildings buildings={buildings} />

        <mesh position={[0, 4.6, 0]} castShadow>
          <boxGeometry args={[2.3, 9.2, 2.3]} />
          <meshStandardMaterial color="#6ED4FF" emissive="#38BDF8" emissiveIntensity={0.35} />
        </mesh>

        <EffectComposer>
          <Bloom intensity={0.95} luminanceThreshold={0.22} luminanceSmoothing={0.72} />
          <Vignette eskil={false} offset={0.22} darkness={0.7} />
        </EffectComposer>

        {exploreMode ? (
          <FlyControls movementSpeed={8} rollSpeed={0.55} dragToLook autoForward={false} />
        ) : (
          <OrbitControls
            enablePan={false}
            minDistance={10}
            maxDistance={26}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.18}
          />
        )}
      </Canvas>
    </div>
  );
}
