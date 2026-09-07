import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  activePartId?: string;
  onSelectPart: (partId: string) => void;
}

export const Hive3DCanvas: React.FC<Props> = ({ activePartId, onSelectPart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialTheme, setMaterialTheme] = useState<'green' | 'amber' | 'charcoal' | 'white'>('green');
  const explodedRef = useRef(exploded);
  explodedRef.current = exploded;
  const hdpeMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const MATERIAL_PRESETS = [
    { id: 'green' as const, name: 'Eco-Green', hex: 0x15803d, bgClass: 'bg-emerald-600' },
    { id: 'amber' as const, name: 'Honey Gold', hex: 0xd97706, bgClass: 'bg-amber-500' },
    { id: 'charcoal' as const, name: 'HDPE Black', hex: 0x334155, bgClass: 'bg-slate-700' },
    { id: 'white' as const, name: 'Thermal White', hex: 0xe2e8f0, bgClass: 'bg-slate-200' },
  ];

  const handleSelectMaterial = (themeId: 'green' | 'amber' | 'charcoal' | 'white') => {
    setMaterialTheme(themeId);
    const preset = MATERIAL_PRESETS.find((p) => p.id === themeId);
    if (preset && hdpeMatRef.current) {
      hdpeMatRef.current.color.setHex(preset.hex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // slate-900

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.5, 3.2, 4.5);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // Ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.8;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(6, 12, 0x166534, 0x1e293b);
    gridHelper.position.y = -0.79;
    scene.add(gridHelper);

    // Group for the entire hive
    const hiveGroup = new THREE.Group();
    scene.add(hiveGroup);

    // Materials
    const initialPreset = MATERIAL_PRESETS.find((p) => p.id === materialTheme);
    const hdpeMat = new THREE.MeshStandardMaterial({
      color: initialPreset ? initialPreset.hex : 0x15803d, // Emerald green HDPE
      roughness: 0.35,
      metalness: 0.1,
    });
    hdpeMatRef.current = hdpeMat;
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Solar blue
      roughness: 0.2,
      metalness: 0.8,
    });
    const woodInteriorMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Amber wood / propolis
      roughness: 0.7,
      metalness: 0.05,
    });
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Stainless steel / aluminum
      roughness: 0.3,
      metalness: 0.7,
    });
    const ledGlowMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
    });

    // 1. Bottom Board & Scale Cells (Part: base)
    const baseGroup = new THREE.Group();
    baseGroup.name = 'base';
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 1.9), hdpeMat);
    basePlate.position.set(0, -0.6, 0.1);
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    baseGroup.add(basePlate);

    // 4 load cell feet
    const footPositions = [
      [-0.65, -0.72, -0.65],
      [0.65, -0.72, -0.65],
      [-0.65, -0.72, 0.65],
      [0.65, -0.72, 0.65],
    ];
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), metalMat);
      foot.position.set(x, y, z);
      foot.castShadow = true;
      baseGroup.add(foot);
    });

    // Alighting entrance
    const entrance = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.2), woodInteriorMat);
    entrance.position.set(0, -0.5, 0.95);
    baseGroup.add(entrance);
    hiveGroup.add(baseGroup);

    // 2. Deep Brood Box (Part: brood)
    const broodGroup = new THREE.Group();
    broodGroup.name = 'brood';
    const broodBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.75, 1.6), hdpeMat);
    broodBox.position.set(0, -0.1, 0);
    broodBox.castShadow = true;
    broodBox.receiveShadow = true;
    broodGroup.add(broodBox);

    // IoT Sensor Probe on Side
    const probe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 12), metalMat);
    probe.rotation.z = Math.PI / 2;
    probe.position.set(0.77, -0.1, 0);
    broodGroup.add(probe);

    // Brood Comb Inserts
    for (let i = -0.5; i <= 0.5; i += 0.25) {
      const comb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 1.4), woodInteriorMat);
      comb.position.set(i, -0.1, 0);
      broodGroup.add(comb);
    }
    hiveGroup.add(broodGroup);

    // 3. Honey Super Box (Part: super)
    const superGroup = new THREE.Group();
    superGroup.name = 'super';
    const superBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, 1.6), hdpeMat);
    superBox.position.set(0, 0.6, 0);
    superBox.castShadow = true;
    superBox.receiveShadow = true;
    superGroup.add(superBox);

    // Honey frames
    for (let i = -0.5; i <= 0.5; i += 0.25) {
      const hcomb = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 1.4), woodInteriorMat);
      hcomb.position.set(i, 0.6, 0);
      superGroup.add(hcomb);
    }
    hiveGroup.add(superGroup);

    // 4. Solar Telemetry Outer Cover (Part: cover)
    const coverGroup = new THREE.Group();
    coverGroup.name = 'cover';
    const outerCover = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.22, 1.75), hdpeMat);
    outerCover.position.set(0, 1.05, 0);
    outerCover.castShadow = true;
    outerCover.receiveShadow = true;
    coverGroup.add(outerCover);

    // Solar Panel on top
    const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 1.1), solarMat);
    solarPanel.position.set(0, 1.18, 0);
    coverGroup.add(solarPanel);

    // GSM Antenna & Status LED
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8), metalMat);
    antenna.position.set(0.6, 1.3, -0.6);
    coverGroup.add(antenna);

    const statusLed = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), ledGlowMat);
    statusLed.position.set(0.65, 1.18, 0.65);
    coverGroup.add(statusLed);
    hiveGroup.add(coverGroup);

    // Raycasting for click selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hiveGroup.children, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && current.parent !== hiveGroup) {
          current = current.parent;
        }
        if (current) {
          if (current.name === 'cover') onSelectPart('sensor-module');
          else if (current.name === 'super') onSelectPart('recycled-composite');
          else if (current.name === 'brood') onSelectPart('acoustic-diagnostics');
          else if (current.name === 'base') onSelectPart('precision-weight');
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Orbit Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      hiveGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(1.0, Math.min(6.0, camera.position.y - deltaY * 0.01));
      camera.lookAt(0, 0.3, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 1 + e.deltaY * 0.001;
      camera.position.x = Math.max(1.8, Math.min(7.0, camera.position.x * zoomFactor));
      camera.position.z = Math.max(2.2, Math.min(8.5, camera.position.z * zoomFactor));
      camera.lookAt(0, 0.4, 0);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        hiveGroup.rotation.y += delta * 0.35;
      }

      // Smoothly interpolate exploded layer positions
      const targetBroodY = explodedRef.current ? 0.2 : 0;
      const targetSuperY = explodedRef.current ? 0.9 : 0;
      const targetCoverY = explodedRef.current ? 1.65 : 0;
      const targetBaseY = explodedRef.current ? -0.4 : 0;

      broodGroup.position.y = THREE.MathUtils.lerp(broodGroup.position.y, targetBroodY, delta * 5);
      superGroup.position.y = THREE.MathUtils.lerp(superGroup.position.y, targetSuperY, delta * 5);
      coverGroup.position.y = THREE.MathUtils.lerp(coverGroup.position.y, targetCoverY, delta * 5);
      baseGroup.position.y = THREE.MathUtils.lerp(baseGroup.position.y, targetBaseY, delta * 5);

      // Pulse the LED glow
      const time = clock.getElapsedTime();
      statusLed.scale.setScalar(1 + Math.sin(time * 6) * 0.2);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, onSelectPart]);

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between">
      {/* 3D Canvas Container with touch-action pan-y */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Interactive 3D WebGL</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setExploded(!exploded)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer ${
              exploded
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border border-amber-400 ring-2 ring-amber-400/30'
                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 border border-amber-400/30 hover:border-amber-400'
            }`}
          >
            {exploded ? 'Collapse Layers' : 'Explode 3D Anatomy'}
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              autoRotate
                ? 'bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-300 border border-amber-400/60'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/40'
            }`}
          >
            {autoRotate ? 'Pause' : 'Auto-Rotate'}
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar: Material Configurator + Hint */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
        {/* Material Swatches Configurator */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">HDPE Finish:</span>
          <div className="flex items-center gap-1.5">
            {MATERIAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectMaterial(preset.id)}
                title={preset.name}
                className={`w-5 h-5 rounded-full ${preset.bgClass} border-2 transition-all cursor-pointer ${
                  materialTheme === preset.id
                    ? 'border-amber-400 scale-110 shadow-sm shadow-amber-400/50'
                    : 'border-slate-600 hover:border-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-amber-300 ml-1">
            {MATERIAL_PRESETS.find((p) => p.id === materialTheme)?.name}
          </span>
        </div>

        {/* Interaction Hint */}
        <div className="text-[11px] text-slate-400 bg-slate-900/85 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-amber-400/25 pointer-events-none flex items-center gap-2">
          <span>Drag to orbit • Scroll to zoom • Click parts to inspect</span>
        </div>
      </div>
    </div>
  );
};
