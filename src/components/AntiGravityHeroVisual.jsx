import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AntiGravityHeroVisual({ theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE, CAMERA, RENDERER SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b17, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    containerRef.current.appendChild(renderer.domElement);

    // 1. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x0a1936, 1.8);
    scene.add(ambientLight);

    // Dynamic Blue Logo Glow PointLight
    const logoGlowLight = new THREE.PointLight(0x0088ff, 8, 12);
    logoGlowLight.position.set(0, 1.5, 0);
    scene.add(logoGlowLight);

    // Cyan Secondary Rim Light
    const rimLight = new THREE.PointLight(0x38bdf8, 4, 10);
    rimLight.position.set(-2, 3, 2);
    scene.add(rimLight);

    // Overhead Spot Light for Platform Metallic Reflections
    const spotLight = new THREE.SpotLight(0x93c5fd, 5);
    spotLight.position.set(0, 8, 4);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // 2. LOGO & TEXT 3D OBJECTS
    // Create Texture from transparent logo.webp
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/logo.webp');
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // Logo 3D Floating Mesh Group
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 1.2, 0);

    const logoGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color(0x0066ff),
      emissiveIntensity: 0.45,
      side: THREE.DoubleSide
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoGroup.add(logoMesh);

    // Backlight Glow Ring behind logo
    const glowRingGeo = new THREE.RingGeometry(1.2, 1.8, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const glowRingMesh = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRingMesh.position.z = -0.15;
    logoGroup.add(glowRingMesh);

    scene.add(logoGroup);

    // 3. FUTURISTIC CIRCULAR PLATFORM
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, -0.6, 0);

    // Base Metallic Chamber Outer Base
    const baseGeo = new THREE.CylinderGeometry(3.2, 3.5, 0.4, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x07152e,
      metalness: 0.9,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    platformGroup.add(baseMesh);

    // Outer Rotating Mechanical Ring
    const outerRingGeo = new THREE.TorusGeometry(2.8, 0.12, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.95,
      roughness: 0.15,
      emissive: new THREE.Color(0x0044aa),
      emissiveIntensity: 0.3
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    outerRingMesh.position.y = 0.22;
    platformGroup.add(outerRingMesh);

    // Inner Counter-Rotating Mechanical Ring
    const innerRingGeo = new THREE.TorusGeometry(2.1, 0.08, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      metalness: 0.85,
      roughness: 0.2,
      emissive: new THREE.Color(0x0088ff),
      emissiveIntensity: 0.6
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = Math.PI / 2;
    innerRingMesh.position.y = 0.25;
    platformGroup.add(innerRingMesh);

    // Center Glowing Energy Core Ring
    const coreGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.1, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00a3ff,
      metalness: 0.3,
      roughness: 0.1,
      emissive: new THREE.Color(0x0077ff),
      emissiveIntensity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.23;
    platformGroup.add(coreMesh);

    scene.add(platformGroup);

    // 4. ANIMATED WATER SURFACE WITH CONTINUOUS RIPPLES
    const waterGeo = new THREE.PlaneGeometry(30, 30, 128, 128);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x030a1a,
      metalness: 0.95,
      roughness: 0.08,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.78;
    scene.add(waterMesh);

    // Original vertex positions for wave deformation animation
    const waterPosAttr = waterGeo.attributes.position;
    const waterInitialZ = new Float32Array(waterPosAttr.count);
    for (let i = 0; i < waterPosAttr.count; i++) {
      waterInitialZ[i] = waterPosAttr.getZ(i);
    }

    // 5. LEFT UI MONITOR SCREEN (DYNAMIC DIGITAL HUD)
    const monitorCanvas = document.createElement('canvas');
    monitorCanvas.width = 512;
    monitorCanvas.height = 320;
    const ctx = monitorCanvas.getContext('2d');

    const monitorTexture = new THREE.CanvasTexture(monitorCanvas);

    const monitorGeo = new THREE.PlaneGeometry(1.8, 1.1);
    const monitorMat = new THREE.MeshBasicMaterial({
      map: monitorTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const monitorMesh = new THREE.Mesh(monitorGeo, monitorMat);
    monitorMesh.position.set(-3.2, 1.4, -1.2);
    monitorMesh.rotation.y = 0.45;
    scene.add(monitorMesh);

    // Monitor frame enclosure
    const frameGeo = new THREE.BoxGeometry(1.9, 1.2, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0b172e, metalness: 0.9, roughness: 0.3 });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(-3.2, 1.4, -1.26);
    frameMesh.rotation.y = 0.45;
    scene.add(frameMesh);

    // 6. BACKGROUND MEDICAL/FUTURISTIC EQUIPMENT
    const equipGroup = new THREE.Group();

    // Background Medical Vessels (Right Side)
    const vesselGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.4, 32);
    const vesselMat = new THREE.MeshStandardMaterial({
      color: 0x091b36,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7
    });
    const vesselMesh = new THREE.Mesh(vesselGeo, vesselMat);
    vesselMesh.position.set(3.4, 1.2, -2.5);
    equipGroup.add(vesselMesh);

    // Fluid inside vessel
    const fluidGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.8, 32);
    const fluidMat = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      emissive: new THREE.Color(0x0055dd),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.6
    });
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    fluidMesh.position.set(3.4, 0.9, -2.5);
    equipGroup.add(fluidMesh);

    scene.add(equipGroup);

    // 7. FLOATING ENERGY PARTICLES
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = Math.random() * 5 - 0.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // 1. Logo Floating & Breathing Glow Motion
      logoGroup.position.y = 1.2 + Math.sin(elapsedTime * 1.8) * 0.08;
      logoGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.05;
      logoMat.emissiveIntensity = 0.4 + Math.sin(elapsedTime * 2.5) * 0.15;
      logoGlowLight.intensity = 7 + Math.sin(elapsedTime * 3.0) * 2.5;

      // 2. Platform Mechanical Ring Rotations
      outerRingMesh.rotation.z = elapsedTime * 0.25;
      innerRingMesh.rotation.z = -elapsedTime * 0.4;
      coreMat.emissiveIntensity = 0.7 + Math.cos(elapsedTime * 2.0) * 0.25;

      // 3. Water Wave & Ripple Deformations
      for (let i = 0; i < waterPosAttr.count; i++) {
        const u = waterPosAttr.getX(i);
        const v = waterPosAttr.getY(i);
        // Distance from center platform
        const dist = Math.sqrt(u * u + v * v);
        const wave1 = Math.sin(u * 1.5 + elapsedTime * 2.2) * 0.05;
        const wave2 = Math.cos(v * 1.5 + elapsedTime * 1.8) * 0.05;
        const ripple = Math.sin(dist * 3.0 - elapsedTime * 3.5) * 0.04;

        waterPosAttr.setZ(i, waterInitialZ[i] + wave1 + wave2 + ripple);
      }
      waterPosAttr.needsUpdate = true;

      // 4. Update Left HUD Screen Canvas UI
      ctx.clearRect(0, 0, 512, 320);
      ctx.fillStyle = 'rgba(5, 15, 35, 0.9)';
      ctx.fillRect(0, 0, 512, 320);

      // HUD Border Grid
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 492, 300);

      // Screen Header
      ctx.fillStyle = '#0088ff';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('NEXALLIANCE // AI SYSTEM ACTIVE', 24, 38);

      // Moving Graph Sine Wave
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      for (let x = 24; x < 480; x += 4) {
        const y = 140 + Math.sin((x + elapsedTime * 150) * 0.03) * 35 + Math.cos((x + elapsedTime * 80) * 0.05) * 15;
        if (x === 24) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Blinking HUD Data Lines
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.fillText(`CPU LOAD: ${(65 + Math.sin(elapsedTime * 4) * 12).toFixed(1)}%`, 24, 220);
      ctx.fillText(`QUANTUM CORE: SYNCED [${(elapsedTime * 10 % 100).toFixed(0)} ms]`, 24, 245);
      ctx.fillText(`SECURITY: ENCRYPTED (AES-256)`, 24, 270);

      // Blinking Alert Dot
      if (Math.floor(elapsedTime * 2) % 2 === 0) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(460, 34, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      monitorTexture.needsUpdate = true;

      // 5. Background Equipment Motion
      fluidMesh.position.y = 0.9 + Math.sin(elapsedTime * 1.5) * 0.04;

      // 6. Floating Particles Slow Upward Movement
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003 + 0.002;
        if (positions[i * 3 + 1] > 4.5) {
          positions[i * 3 + 1] = -0.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // 7. Slow Cinematic Camera Drifting Movement
      camera.position.x = Math.sin(elapsedTime * 0.3) * 0.35;
      camera.position.y = 1.2 + Math.cos(elapsedTime * 0.25) * 0.15;
      camera.lookAt(0, 0.6, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    />
  );
}
