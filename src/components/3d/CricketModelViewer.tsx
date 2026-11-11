import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CricketModelViewerProps {
  rotationDeg: number;
  interactive?: boolean;
  className?: string;
  fallbackImage: string;
}

export const CricketModelViewer: React.FC<CricketModelViewerProps> = ({
  rotationDeg,
  interactive = true,
  className = '',
  fallbackImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(false);

  // References to keep across renders
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0 });
  const targetRotationRef = useRef(rotationDeg);

  useEffect(() => {
    targetRotationRef.current = rotationDeg;
  }, [rotationDeg]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    // Position camera to capture full bat, stumps, bails, and ball
    camera.position.set(0, 0.45, 1.85);

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
    renderer.toneMappingExposure = 1.15;

    // 2. Studio Lighting (Warm Editorial Tone)
    const ambientLight = new THREE.AmbientLight(0xfaf8f2, 1.4);
    scene.add(ambientLight);

    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfffdfa, 2.2);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Soft Sage Fill Light
    const fillLight = new THREE.DirectionalLight(0xe7ebe2, 1.2);
    fillLight.position.set(-3, 2, -1);
    scene.add(fillLight);

    // Rim Light for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Soft ground shadow receiver
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.38;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 3. Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 4. Lazy-load GLB when approaching view
    const loader = new GLTFLoader();
    const modelPath = '/models/cricket-bat-and-stumps.glb';

    loader.load(
      modelPath,
      (gltf) => {
        if (isDisposed) return;

        const root = gltf.scene;

        // Calculate bounding box and center the model
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());

        // Offset to exact center
        root.position.x = -center.x;
        root.position.y = -center.y - 0.02;
        root.position.z = -center.z;

        // Enable shadows and enhance materials
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.25, mat.roughness ?? 0.5);
              mat.envMapIntensity = 1.0;
            }
          }
        });

        modelGroup.add(root);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading cricket GLB model:', error);
        setLoadError(true);
        setLoading(false);
      }
    );

    // 5. Responsive Resize
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

    // 6. Pointer interactions (Damped orbit & Drag)
    const handlePointerDown = (e: PointerEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.prevX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        mouseRef.current.prevX = e.clientX;
        if (modelGroupRef.current) {
          modelGroupRef.current.rotation.y += deltaX * 0.01;
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

    // 7. Render Loop with Damped Rotation
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        if (!mouseRef.current.isDragging) {
          // Smoothly lerp towards target rotation degrees from scroll / buttons
          const targetRad = (targetRotationRef.current * Math.PI) / 180;
          const diff = targetRad - modelGroupRef.current.rotation.y;
          modelGroupRef.current.rotation.y += diff * 0.08;

          // Subtle mouse parallax tilt
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

          modelGroupRef.current.rotation.x = mouseRef.current.y * 0.08;
          modelGroupRef.current.rotation.z = -mouseRef.current.x * 0.05;
        }
      }

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

      // Dispose Three.js objects
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
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loading || loadError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Static Fallback & Loading State */}
      {(loading || loadError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <img
            src={fallbackImage}
            alt="Cricket Equipment Specimen"
            className="max-h-[82%] w-auto object-contain filter contrast-[1.03] transition-opacity duration-500"
          />
          {loading && !loadError && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD8CC] text-[11px] font-mono text-[#52634B] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#52634B] animate-pulse" />
              <span>Loading 3D Willow Atelier ({loadProgress}%)</span>
            </div>
          )}
        </div>
      )}

      {/* Interactive Drag Hint */}
      {!loading && !loadError && (
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-sm border border-[#DDD8CC] font-mono text-[10px] text-[#77776F] shadow-xs pointer-events-none">
          Drag to inspect 3D
        </div>
      )}
    </div>
  );
};
