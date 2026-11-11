import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroInteractive3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Set up Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Group for object rotation
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    // 1. Core Sphere Geometry (Athletic Ball / Precision Orb)
    const geometry = new THREE.SphereGeometry(1.3, 64, 64);
    
    // Custom Material with obsidian leather texture look
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      roughness: 0.35,
      metalness: 0.25,
      wireframe: false,
    });
    const ballMesh = new THREE.Mesh(geometry, ballMaterial);
    ballGroup.add(ballMesh);

    // 2. Neon Seam Rings (Representing high-tech sports seam stitching)
    const seamGeometry1 = new THREE.TorusGeometry(1.305, 0.015, 16, 100);
    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6ff35, // Electric lime
    });
    const seam1 = new THREE.Mesh(seamGeometry1, neonMaterial);
    seam1.rotation.x = Math.PI / 4;
    ballGroup.add(seam1);

    const seamGeometry2 = new THREE.TorusGeometry(1.305, 0.015, 16, 100);
    const seam2 = new THREE.Mesh(seamGeometry2, neonMaterial);
    seam2.rotation.y = Math.PI / 3;
    ballGroup.add(seam2);

    // 3. Stitched Dots / Equator Markers
    const dotsCount = 48;
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount; i++) {
      const theta = (i / dotsCount) * Math.PI * 2;
      dotsPositions[i * 3] = Math.cos(theta) * 1.31;
      dotsPositions[i * 3 + 1] = Math.sin(theta) * 1.31;
      dotsPositions[i * 3 + 2] = 0;
    }
    dotsGeometry.setAttribute('position', new THREE.BufferAttribute(dotsPositions, 3));
    const dotsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
    });
    const dotsMesh = new THREE.Points(dotsGeometry, dotsMaterial);
    ballGroup.add(dotsMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc6ff35, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4080ff, 1.8);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 1.2, 10);
    fillLight.position.set(0, 0, 4);
    scene.add(fillLight);

    // Interaction handling (drag to rotate)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = canvas;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (!isDragging) {
        // Continuous subtle athletic rotation
        targetRotationY += delta * 0.45;
        targetRotationX = Math.sin(clock.getElapsedTime() * 0.6) * 0.15;
      }

      // Smooth interpolation (damping)
      ballGroup.rotation.y += (targetRotationY - ballGroup.rotation.y) * 0.1;
      ballGroup.rotation.x += (targetRotationX - ballGroup.rotation.x) * 0.1;

      // Update state for HUD display
      const currentDeg = Math.round(((ballGroup.rotation.y % (Math.PI * 2)) / (Math.PI * 2)) * 360);
      setRotationAngle(currentDeg >= 0 ? currentDeg : currentDeg + 360);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      geometry.dispose();
      ballMaterial.dispose();
      seamGeometry1.dispose();
      seamGeometry2.dispose();
      neonMaterial.dispose();
      dotsGeometry.dispose();
      dotsMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg aspect-square rounded bg-gradient-to-b from-surface-container to-surface-container-low border border-cold-border p-space-md flex flex-col justify-between overflow-hidden shadow-2xl group select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,255,53,0.12),transparent_70%)] pointer-events-none" />

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2.5 py-1 bg-surface-container-lowest/80 border border-primary-fixed/40 text-primary-fixed font-headline text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping" />
          SIMULATION // 3D-AXIS
        </span>
        <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
          ROT: {rotationAngle}° // 60FPS
        </span>
      </div>

      {/* Three.js Canvas Container */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
        />

        {/* Center overlay labels */}
        <div className="absolute pointer-events-none text-center">
          <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-primary-fixed block mb-0.5">
            PRO-GRADE
          </span>
          <p className="font-headline text-lg uppercase text-white font-bold tracking-tight">
            K.K. APEX-1
          </p>
          <span className="font-headline text-[10px] text-on-surface-variant uppercase tracking-widest">
            {isInteracting ? 'MANUAL INSPECTION ACTIVE' : 'PRECISION BALANCED'}
          </span>
        </div>

        {/* Interactive Badge */}
        <div className="absolute bottom-2 px-3 py-1 bg-surface-container-high/90 backdrop-blur rounded border border-cold-border flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-accent-lime" />
          <span className="font-headline text-[10px] uppercase tracking-widest text-white">
            DRAG TO INSPECT 360°
          </span>
        </div>
      </div>

      {/* Bottom Spec Row */}
      <div className="relative z-10 flex items-center justify-between pt-space-sm border-t border-cold-border font-headline text-[11px]">
        <div className="flex items-center gap-2 text-on-surface">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
          <span className="uppercase tracking-wider">WHOLESALE &amp; RETAIL EXCELLENCE</span>
        </div>
        <span className="text-primary-fixed font-bold tracking-widest">₹ REQ QUOTE</span>
      </div>
    </div>
  );
};
