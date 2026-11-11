import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CarModelViewerProps {
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

export const CarModelViewer: React.FC<CarModelViewerProps> = ({
  className = '',
  autoRotate = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0, prevY: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = containerRef.current.clientWidth || 450;
    const height = containerRef.current.clientHeight || 450;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    // Camera framed so the whole car is in view from a clean 3/4 elevated perspective
    camera.position.set(4.2, 1.8, 5.2);
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
    renderer.toneMappingExposure = 1.3;

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xf8f9fa, 1.8);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfffdf5, 3.2);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Soft Rim Light for car contours
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xdce6d8, 1.5);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.58;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 3. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 4. Load GLB (Primary: Ford Mustang GLB)
    const loader = new GLTFLoader();
    const modelPath = '/models/mustang.glb';

    const handleLoadedGltf = (gltf: any) => {
      if (isDisposed) return;

      const root = gltf.scene;

      // Accurately center and normalize the scale of the model
      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = maxDim > 10 ? 2.8 / maxDim : (maxDim < 1 ? 2.8 / maxDim : 1);
      root.scale.setScalar(scaleFactor);

      root.position.x = -center.x * scaleFactor;
      root.position.y = -center.y * scaleFactor;
      root.position.z = -center.z * scaleFactor;

      if (shadowPlane) {
        shadowPlane.position.y = (-size.y * scaleFactor) / 2 - 0.02;
      }

      root.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.envMapIntensity = 1.4;

            // Give sports car body a sleek metallic finish
            const matName = (mat.name || '').toLowerCase();
            if (matName.includes('body') || matName.includes('paint') || matName.includes('car')) {
              mat.roughness = 0.2;
              mat.metalness = 0.8;
            }
          }
        }
      });

      modelGroup.add(root);

      // Frame camera elevated perspective
      camera.position.set(2.8, 1.4, 3.2);
      camera.lookAt(0, 0, 0);

      setLoading(false);
    };

    loader.load(
      modelPath,
      handleLoadedGltf,
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.warn('Primary mustang GLB load note, falling back to sports-car.glb:', err);
        loader.load('/models/sports-car.glb', handleLoadedGltf);
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
          modelGroupRef.current.rotation.y += deltaX * 0.008;
          modelGroupRef.current.rotation.x += deltaY * 0.004;
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

    // 7. Render Loop with Smooth Auto-Rotation
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        if (autoRotate && !mouseRef.current.isDragging) {
          // Continuous 360 auto-rotation
          modelGroupRef.current.rotation.y += 0.007;
        }

        // Subtle mouse parallax tilt
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        modelGroupRef.current.rotation.x = mouseRef.current.y * 0.05;
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
      className={`relative w-full h-full min-h-[360px] flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD8CC] text-xs font-mono text-[#52634B] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#52634B] animate-pulse" />
            <span>Loading 3D Sports Car ({loadProgress}%)</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-sm border border-[#DDD8CC] font-mono text-[10px] text-[#77776F] shadow-xs pointer-events-none">
          360° Auto-Rotate • Drag to Orbit
        </div>
      )}
    </div>
  );
};
