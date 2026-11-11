import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface BadmintonModelViewerProps {
  interactive?: boolean;
  className?: string;
  fallbackImage: string;
  autoRotate?: boolean;
}

export const BadmintonModelViewer: React.FC<BadmintonModelViewerProps> = ({
  interactive = true,
  className = '',
  fallbackImage,
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(false);

  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0, prevY: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth || 450;
    const height = containerRef.current.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0.1, 1.25);
    camera.lookAt(0, 0, 0);

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

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xf8fbf6, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(2.5, 3.5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdce6d8, 1.3);
    fillLight.position.set(-3, 1.5, -1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 2.5, -2);
    scene.add(rimLight);

    // Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.28;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 3. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 4. Load GLB
    const loader = new GLTFLoader();
    const modelPath = '/models/badminton-racket-and-shuttlecock.glb';

    loader.load(
      modelPath,
      (gltf) => {
        if (isDisposed) return;

        const root = gltf.scene;

        // Exact centering
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        shadowPlane.position.y = -size.y / 2 - 0.04;

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.18, mat.roughness ?? 0.4);
              mat.envMapIntensity = 1.2;
            }
          }
        });

        modelGroup.add(root);

        // Compute safe camera distance
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const dist = Math.max(1.2, Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.3);
        camera.position.set(0, 0, dist);
        camera.lookAt(0, 0, 0);

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading badminton GLB model:', error);
        setLoadError(true);
        setLoading(false);
      }
    );

    // 5. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          camera.lookAt(0, 0, 0);
          renderer.setSize(w, h, false);
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    // 6. Pointer interactions
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

        if (modelGroupRef.current) {
          modelGroupRef.current.rotation.y += deltaX * 0.01;
          modelGroupRef.current.rotation.x += deltaY * 0.01;
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
    if (interactive && canvasEl) {
      canvasEl.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    // 7. Render Loop with Auto-Rotation
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        if (autoRotate && !mouseRef.current.isDragging) {
          // Smooth continuous auto-rotation
          modelGroupRef.current.rotation.y += 0.007;
          modelGroupRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.015;
        }

        // Mouse parallax
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        modelGroupRef.current.rotation.x = -0.15 + mouseRef.current.y * 0.06;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 8. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (interactive && canvasEl) {
        canvasEl.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      }

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose());
          } else if (m.material) {
            m.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [interactive, autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[320px] flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loading || loadError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {(loading || loadError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <img
            src={fallbackImage}
            alt="Badminton Equipment Specimen"
            className="max-h-[82%] w-auto object-contain filter contrast-[1.03] transition-opacity duration-500"
          />
          {loading && !loadError && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD8CC] text-[11px] font-mono text-[#52634B] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#52634B] animate-pulse" />
              <span>Loading 3D Racket ({loadProgress}%)</span>
            </div>
          )}
        </div>
      )}

      {!loading && !loadError && (
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-sm border border-[#DDD8CC] font-mono text-[10px] text-[#77776F] shadow-xs pointer-events-none">
          Drag to inspect 3D
        </div>
      )}
    </div>
  );
};
