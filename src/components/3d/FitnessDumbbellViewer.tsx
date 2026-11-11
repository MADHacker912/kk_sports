import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FitnessDumbbellViewerProps {
  className?: string;
}

export const FitnessDumbbellViewer: React.FC<FitnessDumbbellViewerProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dumbbellGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0, prevY: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 2.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xf8f9fa, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdde3db, 1.2);
    fillLight.position.set(-3, 2, -1);
    scene.add(fillLight);

    // Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.45;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Dumbbell Group
    const group = new THREE.Group();
    scene.add(group);
    dumbbellGroupRef.current = group;

    // Materials
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.9,
      roughness: 0.2,
    });

    const urethaneMat = new THREE.MeshStandardMaterial({
      color: 0x242621,
      metalness: 0.1,
      roughness: 0.6,
    });

    // Handle Cylinder
    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 32);
    const handleMesh = new THREE.Mesh(handleGeo, chromeMat);
    handleMesh.rotation.z = Math.PI / 2;
    handleMesh.castShadow = true;
    group.add(handleMesh);

    // Hexagonal Weight Heads
    const hexGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.22, 6);

    const leftHead = new THREE.Mesh(hexGeo, urethaneMat);
    leftHead.rotation.z = Math.PI / 2;
    leftHead.position.x = -0.42;
    leftHead.castShadow = true;
    leftHead.receiveShadow = true;
    group.add(leftHead);

    const rightHead = new THREE.Mesh(hexGeo, urethaneMat);
    rightHead.rotation.z = Math.PI / 2;
    rightHead.position.x = 0.42;
    rightHead.castShadow = true;
    rightHead.receiveShadow = true;
    group.add(rightHead);

    // Initial tilt
    group.rotation.set(-0.3, 0.6, 0.2);

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    // Drag / Orbit
    const handlePointerDown = (e: PointerEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        const deltaY = e.clientY - mouseRef.current.prevY;
        mouseRef.current.prevX = e.clientX;
        mouseRef.current.prevY = e.clientY;

        if (dumbbellGroupRef.current) {
          dumbbellGroupRef.current.rotation.y += deltaX * 0.01;
          dumbbellGroupRef.current.rotation.x += deltaY * 0.01;
        }
      } else {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        }
      }
    };

    const handlePointerUp = () => {
      mouseRef.current.isDragging = false;
    };

    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (dumbbellGroupRef.current && !mouseRef.current.isDragging) {
        dumbbellGroupRef.current.rotation.y += 0.003;
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        dumbbellGroupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (canvasEl) {
        canvasEl.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      }

      handleGeo.dispose();
      hexGeo.dispose();
      chromeMat.dispose();
      urethaneMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-[#DDD8CC] font-mono text-[10px] text-[#52634B] shadow-xs pointer-events-none">
        Drag to Rotate 3D Dumbbell
      </div>
    </div>
  );
};
