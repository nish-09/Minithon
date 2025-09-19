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

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black universe background
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      currentMount.clientWidth / currentMount.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 8;

    // WebGL Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Create the molecule
    const molecule = new THREE.Group();
    scene.add(molecule);

    // Atom properties
    const carbonRadius = 0.7;
    const oxygenRadius = 0.55;
    const bondDistance = 1.8;
    const bondRadius = 0.12;
    const doubleBondOffset = 0.2;

    // Materials
    const carbonMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x282828, 
      roughness: 0.5, 
      metalness: 0.2 
    });
    const oxygenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcc0000, 
      roughness: 0.5, 
      metalness: 0.2 
    });
    const bondMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      roughness: 0.8, 
      metalness: 0.1 
    });

    // Carbon atom (center)
    const carbonGeometry = new THREE.SphereGeometry(carbonRadius, 32, 32);
    const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
    molecule.add(carbonAtom);

    // Oxygen atoms
    const oxygenGeometry = new THREE.SphereGeometry(oxygenRadius, 32, 32);
    
    const oxygenAtom1 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
    oxygenAtom1.position.x = bondDistance;
    molecule.add(oxygenAtom1);
    
    const oxygenAtom2 = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
    oxygenAtom2.position.x = -bondDistance;
    molecule.add(oxygenAtom2);

    // Double bonds
    const bondGeometry = new THREE.CylinderGeometry(bondRadius, bondRadius, bondDistance, 16);
    
    // Helper function to create a double bond
    function createDoubleBond(direction: number) {
      const bondGroup = new THREE.Group();
      
      const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
      bond1.position.y = doubleBondOffset / 2;
      
      const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
      bond2.position.y = -doubleBondOffset / 2;

      bondGroup.add(bond1);
      bondGroup.add(bond2);
      
      // Position and orient the bond group
      bondGroup.position.x = direction * bondDistance / 2;
      bondGroup.rotation.z = Math.PI / 2; // Rotate to be horizontal
      
      molecule.add(bondGroup);
    }

    createDoubleBond(1);  // Bond to the right oxygen
    createDoubleBond(-1); // Bond to the left oxygen

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
      
      // Faster rotation for more dynamic effect
      if (molecule) {
        molecule.rotation.y += 0.01;
      }

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

  return (
    <div ref={mountRef} className="w-full h-full cursor-pointer relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm font-semibold text-center z-10">
        CARBON DIOXIDE 3D Model
      </div>
    </div>
  );
}
