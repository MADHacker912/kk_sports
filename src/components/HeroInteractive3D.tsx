import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroInteractive3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set up Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.3;

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

    // Core Sphere Geometry
    const geometry = new THREE.SphereGeometry(1.3, 64, 64);
    
    // Custom Material with obsidian leather texture feel
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.38,
      metalness: 0.2,
    });
    const ballMesh = new THREE.Mesh(geometry, ballMaterial);
    ballGroup.add(ballMesh);

    // Electric Lime Precision Seams
    const seamGeometry1 = new THREE.TorusGeometry(1.304, 0.012, 16, 120);
    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6ff35,
    });
    const seam1 = new THREE.Mesh(seamGeometry1, neonMaterial);
    seam1.rotation.x = Math.PI / 4;
    ballGroup.add(seam1);

    const seamGeometry2 = new THREE.TorusGeometry(1.304, 0.012, 16, 120);
    const seam2 = new THREE.Mesh(seamGeometry2, neonMaterial);
    seam2.rotation.y = Math.PI / 3;
    ballGroup.add(seam2);

    // Subtle Equator Stitch Markers
    const dotsCount = 36;
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount; i++) {
      const theta = (i / dotsCount) * Math.PI * 2;
      dotsPositions[i * 3] = Math.cos(theta) * 1.308;
      dotsPositions[i * 3 + 1] = Math.sin(theta) * 1.308;
      dotsPositions[i * 3 + 2] = 0;
    }
    dotsGeometry.setAttribute('position', new THREE.BufferAttribute(dotsPositions, 3));
    const dotsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
    });
    const dotsMesh = new THREE.Points(dotsGeometry, dotsMaterial);
    ballGroup.add(dotsMesh);

    // Lighting (Surgical Rim Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc6ff35, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // Drag to rotate interaction
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

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (!isDragging && !prefersReducedMotion) {
        targetRotationY += delta * 0.35;
        targetRotationX = Math.sin(clock.getElapsedTime() * 0.5) * 0.12;
      }

      ballGroup.rotation.y += (targetRotationY - ballGroup.rotation.y) * 0.1;
      ballGroup.rotation.x += (targetRotationX - ballGroup.rotation.x) * 0.1;

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
      className="relative w-full max-w-md aspect-square rounded bg-[#101215] border border-[#232730] p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none"
    >
      {/* Discreet Header */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA]">
          PRECISION CRAFT // 3D
        </span>
        <span className="font-mono text-[10px] text-[#C6FF35] uppercase">
          K.K. APEX-1
        </span>
      </div>

      {/* Three.js Canvas Container */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
        />

        {/* Minimal interaction hint */}
        <div className="absolute bottom-2 px-3 py-1 rounded bg-[#08090B]/80 backdrop-blur border border-[#2C3038] font-mono text-[9px] uppercase tracking-widest text-[#A1A1AA] pointer-events-none">
          {isInteracting ? 'MANUAL ROTATION' : 'DRAG TO ROTATE 360°'}
        </div>
      </div>

      {/* Discreet Footer Info */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#1F2228] font-mono text-[10px] text-[#A1A1AA]">
        <span>MATCH GRADE CALIBRATION</span>
        <span className="text-white">KANPUR FLAGSHIP</span>
      </div>
    </div>
  );
};
