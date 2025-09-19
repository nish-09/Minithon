"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CarbonMolecule3DProps = {
  onMoleculeClick: () => void;
};

export default function CarbonMolecule3D({ onMoleculeClick }: CarbonMolecule3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current || rendererRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Molecule Group
    const molecule = new THREE.Group();

    // Carbon atom
    const carbonGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const carbonMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
    molecule.add(carbonAtom);

    // Oxygen atoms
    const oxygenGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const oxygenMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 });
    const oxygenAtom1 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
    oxygenAtom1.position.set(-1.5, 0.5, 0);
    const oxygenAtom2 = oxygenAtom1.clone();
    oxygenAtom2.position.set(1.5, -0.5, 0);
    molecule.add(oxygenAtom1);
    molecule.add(oxygenAtom2);

    // Bonds
    const bondMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const bondGeometry1 = new THREE.CylinderGeometry(0.1, 0.1, 1.6, 8);
    const bond1 = new THREE.Mesh(bondGeometry1, bondMaterial);
    bond1.position.set(-0.75, 0.25, 0);
    bond1.lookAt(carbonAtom.position);
    bond1.rotateX(Math.PI / 2);
    
    const bond2 = new THREE.Mesh(bondGeometry1.clone(), bondMaterial);
    bond2.position.set(0.75, -0.25, 0);
    bond2.lookAt(carbonAtom.position);
    bond2.rotateX(Math.PI / 2);

    molecule.add(bond1);
    molecule.add(bond2);

    scene.add(molecule);

    // Raycaster for clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(molecule.children, true);

      if (intersects.length > 0) {
        onMoleculeClick();
      }
    };
    currentMount.addEventListener("click", onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      molecule.rotation.y += 0.005;
      molecule.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeEventListener("click", onClick);
      if (rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [onMoleculeClick]);

  return <div ref={mountRef} className="w-full h-full cursor-pointer" />;
}
