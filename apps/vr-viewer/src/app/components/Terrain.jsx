import React, { useMemo, useRef } from 'react';
import { useFBXLoader } from 'hooks';
import { Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { SCENES } from 'constants/enums';
import useQuasarStore from 'store';

const Terrain = () => {
  const terrain = useRef(null);
  const setActiveScene = useQuasarStore((state) => state.setActiveScene);
  const scales = [
    0.4, 0.3, 0.08, 0.05, 0.05, 0.2, 0.2, 0.4, 0.5, 0.1, 0.4, 0.4,
  ];
  const objects = useFBXLoader(
    [
      'assets/textures/nature/BirchTree_3.fbx',
      'assets/textures/nature/BirchTree_4.fbx',
      'assets/textures/nature/BushBerries_1.fbx',
      'assets/textures/nature/CommonTree_3.fbx',
      'assets/textures/nature/CommonTree_5.fbx',
      'assets/textures/nature/Grass_2.fbx',
      'assets/textures/nature/Grass.fbx',
      'assets/textures/nature/Rock_1.fbx',
      'assets/textures/nature/Rock_5.fbx',
      'assets/textures/nature/Willow_2.fbx',
      'assets/textures/nature/Willow_5.fbx',
      'assets/textures/nature/WoodLog_Moss.fbx',
    ],
    (objs) => {
      objs.forEach((obj, idx) => {
        obj.traverse((o) => {
          o.castShadow = true;
          o.receiveShadow = true;
        });
        obj.scale.setScalar(scales[idx]);
      });
    },
  );
  const { scene } = useGLTF('assets/models/quasars/quasar2.glb');

  const trees = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => {
      const idx = Math.floor(Math.random() * 11) + 1;
      const pos = new Vector3(
        Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1),
        0,
        Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1),
      );
      return (
        <primitive
          key={i}
          position={pos}
          object={objects[idx % objects.length]}
        />
      );
    });
  }, [objects]);

  const handleClick = (e) => {
    setActiveScene(SCENES.museum);
  };

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry
          attach="geometry"
          args={[500, 500, 50, 50]}
          ref={terrain}
        />
        <meshBasicMaterial color="green" />
      </mesh>
      <group position={[0, 15, 87]} scale={1} onClick={handleClick}>
        <primitive object={scene} castShadow />
      </group>
    </>
  );
};

export default Terrain;
