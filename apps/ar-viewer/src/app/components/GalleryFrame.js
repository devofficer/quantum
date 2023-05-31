import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { animated } from '@react-spring/three';
import * as THREE from 'three';

const GalleryFrame = ({ url, aspectRatio }) => {
  const frameRef = useRef();
  const { scene } = useGLTF(url);

  const frameBounds = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    return {
      x: Math.abs(box.max.x - box.min.x),
      y: Math.abs(box.max.y - box.min.y),
      z: Math.abs(box.max.z - box.min.z),
    };
  }, [scene]);

  const frameCloned = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child.isMesh && cloned?.reTextureize) {
        if (child.name.includes('instance')) {
          const { color, roughness, metalness } = child.material;
          const newMaterial = new THREE.MeshPhysicalMaterial({
            color,
            roughness,
            metalness,
          });

          child.material = newMaterial;
          child.material.needsUpdate = true;
        }
      }
    });
    return cloned;
  }, [scene]);

  useEffect(() => {
    const scaleMultiplier = 0.5;
    const mountPadding = 0.1;
    const assetBounds = [scaleMultiplier / aspectRatio, scaleMultiplier].map(
      (bound) => bound + mountPadding + 0.1,
    );

    const outerMountBounds = {
      x: Math.abs(assetBounds[0]),
      y: Math.abs(assetBounds[1]),
      z: 0.05,
    };

    const lengthRatios = [
      outerMountBounds.x / frameBounds.x,
      outerMountBounds.y / frameBounds.y,
      outerMountBounds.z / frameBounds.z,
    ];

    frameRef.current.scale.set(...lengthRatios);
    frameRef.current.updateMatrix();
  }, [aspectRatio, frameBounds]);

  return (
    <animated.group ref={frameRef} position={[0, 0, 0.01]}>
      <primitive object={frameCloned} />
    </animated.group>
  );
};

export default GalleryFrame;
