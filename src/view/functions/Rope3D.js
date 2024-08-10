import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Rope3D() {
  const mountRef = useRef(null);
  const [startPoint, setStartPoint] = useState(new THREE.Vector3(-10, 0, 0));
  const [endPoint, setEndPoint] = useState(new THREE.Vector3(20, -10, 0));
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const updateRopeGeometry = () => {
      const ropeGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([startPoint, new THREE.Vector3(0, 10, 0), endPoint]),
        20,
        0.5,
        8,
        false
      );
      return ropeGeometry;
    };

    const ropeMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: true });
    let rope = new THREE.Mesh(updateRopeGeometry(), ropeMaterial);
    scene.add(rope);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.remove(rope); // Remove the old rope
      rope = new THREE.Mesh(updateRopeGeometry(), ropeMaterial); // Add the new one
      scene.add(rope);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [startPoint, endPoint]);

  const onMouseDown = (e, point) => {
    setDragging(point);
  };

  const onMouseMove = (e) => {
    if (dragging) {
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const newPoint = new THREE.Vector3(x * 20, y * 20, 0);

      if (dragging === 'start') {
        setStartPoint(newPoint);
      } else if (dragging === 'end') {
        setEndPoint(newPoint);
      }
    }
  };

  const onMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100vh' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        style={{
          position: 'absolute',
          top: `${(startPoint.y / 20 + 0.5) * 100}%`,
          left: `${(startPoint.x / 20 + 0.5) * 100}%`,
          cursor: 'pointer',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={(e) => onMouseDown(e, 'start')}
      />
      <div
        style={{
          position: 'absolute',
          top: `${(endPoint.y / 20 + 0.5) * 100}%`,
          left: `${(endPoint.x / 20 + 0.5) * 100}%`,
          cursor: 'pointer',
          width: '10px',
          height: '10px',
          backgroundColor: 'blue',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={(e) => onMouseDown(e, 'end')}
      />
    </div>
  );
}
