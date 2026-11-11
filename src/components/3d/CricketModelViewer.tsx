import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CricketModelViewerProps {
  rotationDeg: number;
  interactive?: boolean;
  className?: string;
  fallbackImage: string;
  autoRotate?: boolean;
}

export const CricketModelViewer: React.FC<CricketModelViewerProps> = ({
  rotationDeg,
  interactive = true,
  className = '',
  fallbackImage,
  autoRotate = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(false);

  const modelGroupRef = useRef<THREE.Group | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0 });
  const targetRotationRef = useRef(rotationDeg);

  useEffect(() => {
    targetRotationRef.current = rotationDeg;
  }, [rotationDeg]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = containerRef.current.clientWidth || 450;
    const height = containerRef.current.clientHeight || 450;

    // Camera with 36° FOV for flattering focal length and framing
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0, 1.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

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
    const ambientLight = new THREE.AmbientLight(0xfdfbf7, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffef7, 2.8);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8eee4, 1.4);
    fillLight.position.set(-3, 2, -1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 3, -2.5);
    scene.add(rimLight);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.4;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // 3. Model Container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 4. Load GLB and dynamically fit camera to frame 100% of the model
    const loader = new GLTFLoader();
    const modelPath = '/models/cricket-bat-and-stumps.glb';

    loader.load(
      modelPath,
      (gltf) => {
        if (isDisposed) return;

        const root = gltf.scene;

        // Accurately center the model around origin (0, 0, 0)
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        // Position shadow receiver just below the base of the stumps/bat
        if (shadowPlaneRef.current) {
          shadowPlaneRef.current.position.y = -size.y / 2 - 0.02;
        }

        // Enable shadows and enhance materials
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.2, mat.roughness ?? 0.5);
              mat.envMapIntensity = 1.2;
            }
          }
        });

        modelGroup.add(root);

        // Dynamically compute camera distance so full model fits with safe margin
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraDistance = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.35;

        // Ensure minimum safe distance
        cameraDistance = Math.max(cameraDistance, 1.55);
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);

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

    // 7. Render Loop with centering and auto-rotate / scroll rotation
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        if (autoRotate && !mouseRef.current.isDragging) {
          // Continuous smooth auto-rotation
          modelGroupRef.current.rotation.y += 0.006;
        } else if (!mouseRef.current.isDragging) {
          // Smoothly lerp towards target rotation degrees from scroll / buttons
          const targetRad = (targetRotationRef.current * Math.PI) / 180;
          const diff = targetRad - modelGroupRef.current.rotation.y;
          modelGroupRef.current.rotation.y += diff * 0.08;
        }

        // Mouse parallax tilt
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        modelGroupRef.current.rotation.x = mouseRef.current.y * 0.06;
        modelGroupRef.current.rotation.z = -mouseRef.current.x * 0.04;
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
