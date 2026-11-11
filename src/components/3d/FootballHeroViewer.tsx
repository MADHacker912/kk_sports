import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FootballHeroViewerProps {
  className?: string;
}

export const FootballHeroViewer: React.FC<FootballHeroViewerProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0, prevY: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 2.6);

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
    renderer.toneMappingExposure = 1.25;

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfdfbf7, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf5, 2.5);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe7ebe2, 1.2);
    fillLight.position.set(-3, 1, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Soft Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.72;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 3. Build Realistic Match Football Geometry
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);
    ballGroupRef.current = ballGroup;

    // Create a detailed truncated-icosahedron styled tournament match ball
    const radius = 0.62;
    const ballGeo = new THREE.IcosahedronGeometry(radius, 4);

    // High quality canvas texture for seamless textured panels
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm clean base
      ctx.fillStyle = '#FAF9F6';
      ctx.fillRect(0, 0, 1024, 512);

      // Gold & Dark Sage graphic tournament blades
      ctx.fillStyle = '#272923';
      for (let i = 0; i < 6; i++) {
        const cx = 120 + i * 160;
        const cy = 256 + Math.sin(i * 1.2) * 80;
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.fill();

        // Accent chevron
        ctx.fillStyle = '#52634B';
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#272923';
      }

      // Micro leather texture dots
      ctx.fillStyle = 'rgba(39, 41, 35, 0.05)';
      for (let x = 0; x < 1024; x += 8) {
        for (let y = 0; y < 512; y += 8) {
          ctx.fillRect(x + (y % 16 === 0 ? 4 : 0), y, 2, 2);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const ballMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.35,
      metalness: 0.08,
      bumpScale: 0.02,
    });

    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;
    ballGroup.add(ballMesh);

    // Initial slight tilt
    ballGroup.rotation.set(0.3, 0.5, 0.2);

    // 4. Resize
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

    // 5. Pointer Drag & Orbit
    const handlePointerDown = (e: PointerEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
      setIsInteracting(true);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        const deltaY = e.clientY - mouseRef.current.prevY;
        mouseRef.current.prevX = e.clientX;
        mouseRef.current.prevY = e.clientY;

        if (ballGroupRef.current) {
          ballGroupRef.current.rotation.y += deltaX * 0.012;
          ballGroupRef.current.rotation.x += deltaY * 0.012;
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
      setIsInteracting(false);
    };

    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    // 6. Animation loop with ambient spin + mouse follow
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (ballGroupRef.current && !mouseRef.current.isDragging) {
        // Slow continuous rolling spin
        ballGroupRef.current.rotation.y += 0.004;
        ballGroupRef.current.rotation.x += 0.002;

        // Damped mouse parallax
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

        ballGroupRef.current.position.x = mouseRef.current.x * 0.08;
        ballGroupRef.current.position.y = -mouseRef.current.y * 0.06;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (canvasEl) {
        canvasEl.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      }

      ballGeo.dispose();
      ballMat.dispose();
      texture.dispose();
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

      <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-[#DDD8CC] font-mono text-[10px] text-[#52634B] shadow-xs pointer-events-none">
        {isInteracting ? 'Inspecting Match Ball' : 'Drag to Rotate 3D Match Ball'}
      </div>
    </div>
  );
};
