import React, { useEffect, useMemo, useRef } from 'react';
import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  useKeyboardControls,
} from '@react-three/drei';
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { TextureLoader } from 'three';
import { MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

const photos = [
  'assets/textures/photos/1.jpg',
  'assets/textures/photos/2.jpg',
  'assets/textures/photos/3.jpg',
  'assets/textures/photos/4.jpg',
  'assets/textures/photos/5.jpg',
  'assets/textures/photos/6.jpg',
  'assets/textures/photos/7.jpg',
  'assets/textures/photos/8.jpg',
  'assets/textures/photos/9.jpg',
  'assets/textures/photos/10.jpg',
];

export function Museum(props) {
  const group = useRef();
  const { forward, backward } = useKeyboardControls((state) => state);
  const { nodes, materials, animations } = useGLTF('assets/models/museum.glb');
  const { scene } = useGLTF('assets/models/quasars/quasar2.glb');
  const { actions } = useAnimations(animations, group);

  const material = useMemo(() => {
    const ktxLoader = new KTXLoader();
    const texture = ktxLoader.load('assets/textures/skybox.ktx');
    return new MeshStandardMaterial({ map: texture });
  }, []);

  const photoMaterials = useMemo(() => {
    const textureLoader = new TextureLoader();
    return photos
      .map((path) => textureLoader.load(path))
      .map((texture) => new MeshStandardMaterial({ map: texture }));
  }, []);

  const wheelCounter = useRef(0);
  const prevDir = useRef(0);
  const deltaTime = useRef(0);

  useFrame((state, delta) => {
    deltaTime.current += delta;

    if (deltaTime.current > 0.1) {
      if (forward) {
        handleWheel({ deltaY: -1 });
      } else if (backward) {
        handleWheel({ deltaY: 1 });
      }

      deltaTime.current = 0;
    }
  });

  const handleWheel = (e) => {
    const currDir = Math.sign(e.deltaY);

    if (currDir !== prevDir.current) {
      wheelCounter.current = 0;
      prevDir.current = currDir;
    } else {
      wheelCounter.current += 1;
    }

    actions.Main.timeScale = currDir;

    setTimeout(() => {
      if (wheelCounter.current == 0) {
        actions.Main.timeScale = 0;
        wheelCounter.current = 0;
      }
      wheelCounter.current -= 1;
    }, 500);
  };

  useEffect(() => {
    if (actions.Main) {
      actions.Main.timeScale = 0;
      actions.Main.play();
    }
  }, [actions]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="world_root">
            <group
              name="CameraPos"
              position={[0.01, 1.26, 22.84]}
              rotation={[0.19, 0, 0]}
            >
              <group name="Camera">
                <PerspectiveCamera fov={50} makeDefault />
              </group>
            </group>
            <group
              name="ArtworkFrame_050"
              position={[2.41, 1.61, 0.98]}
              rotation={[0, 1.57, 0]}
              scale={[1.44, 1.29, 1]}
            />
            <group
              name="ArtworkFrame_063"
              position={[10.39, 5.81, 0.19]}
              rotation={[0, 1.57, 0]}
              scale={[1.77, 1.48, 1]}
            />
            <group
              name="ArtworkFrame_080"
              position={[-9.54, 5.76, -1.46]}
              rotation={[0, -1.57, 0]}
              scale={[1.67, 1.07, 1]}
            />
            <group
              name="ArtworkFrame_052"
              position={[10.39, 5.81, 5.03]}
              rotation={[0, 1.57, 0]}
              scale={[1.3, 1.52, 1]}
            />
            <group
              name="ArtworkFrame_069"
              position={[-3.83, 5.89, 2.61]}
              scale={[1.72, 1.56, 1]}
            />
            <group
              name="ArtworkFrame_109"
              position={[-2.38, 1.61, 5.39]}
              rotation={[0, -1.57, 0]}
              scale={[1.61, 1.46, 1]}
            />
            <group
              name="ArtworkFrame_083"
              position={[0, 1.62, -19.45]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[2.53, 1.87, 1]}
            />
            <group position={[0, 1.6, 18.87]} scale={0.06}>
              <primitive object={scene} castShadow />
            </group>
            <group name="museum">
              <mesh
                name="museum_1"
                visible={false}
                receiveShadow
                geometry={nodes.museum_1.geometry}
                material={materials.ArtworkHover_050}
              />
              <mesh
                name="museum_2"
                visible={false}
                receiveShadow
                geometry={nodes.museum_2.geometry}
                material={materials.ArtworkHover_052}
              />
              <mesh
                name="museum_3"
                visible={false}
                receiveShadow
                geometry={nodes.museum_3.geometry}
                material={materials.ArtworkHover_063}
              />
              <mesh
                name="museum_4"
                visible={false}
                receiveShadow
                geometry={nodes.museum_4.geometry}
                material={materials.ArtworkHover_069}
              />
              <mesh
                name="museum_5"
                visible={false}
                receiveShadow
                geometry={nodes.museum_5.geometry}
                material={materials.ArtworkHover_080}
              />
              <mesh
                name="museum_6"
                visible={false}
                receiveShadow
                geometry={nodes.museum_6.geometry}
                material={materials.ArtworkHover_083}
              />
              <mesh
                name="museum_7"
                visible={false}
                receiveShadow
                geometry={nodes.museum_7.geometry}
                material={materials.ArtworkHover_109}
              />
              <mesh
                name="museum_8"
                receiveShadow
                geometry={nodes.museum_8.geometry}
                material={photoMaterials[0]}
              />
              <mesh
                name="museum_9"
                receiveShadow
                geometry={nodes.museum_9.geometry}
                material={photoMaterials[1]}
              />
              <mesh
                name="museum_10"
                receiveShadow
                geometry={nodes.museum_10.geometry}
                material={photoMaterials[2]}
              />
              <mesh
                name="museum_11"
                receiveShadow
                geometry={nodes.museum_11.geometry}
                material={photoMaterials[3]}
              />
              <mesh
                name="museum_12"
                receiveShadow
                geometry={nodes.museum_12.geometry}
                material={photoMaterials[4]}
              />
              <mesh
                name="museum_13"
                receiveShadow
                geometry={nodes.museum_13.geometry}
                material={photoMaterials[5]}
              />
              <mesh
                name="museum_14"
                receiveShadow
                geometry={nodes.museum_14.geometry}
                material={photoMaterials[6]}
              />
              <mesh
                name="museum_15"
                castShadow
                receiveShadow
                geometry={nodes.museum_15.geometry}
                material={materials.Floor_LM_3}
              />
              <mesh
                name="museum_16"
                castShadow
                receiveShadow
                geometry={nodes.museum_16.geometry}
                material={materials.Floor_LM_4}
              />
              <mesh
                name="museum_17"
                castShadow
                receiveShadow
                geometry={nodes.museum_17.geometry}
                material={materials.Floor_LM_2}
              />
              <mesh
                name="museum_18"
                castShadow
                receiveShadow
                geometry={nodes.museum_18.geometry}
                material={materials.Floor_LM_1}
              />
              <mesh
                name="museum_19"
                castShadow
                receiveShadow
                geometry={nodes.museum_19.geometry}
                material={materials.Architecture_LM_3}
              />
              <mesh
                name="museum_20"
                castShadow
                receiveShadow
                geometry={nodes.museum_20.geometry}
                material={materials.FloorPattern_LM_1}
              />
              <mesh
                name="museum_21"
                castShadow
                receiveShadow
                geometry={nodes.museum_21.geometry}
                material={materials.Architecture_LM_6}
              />
              <mesh
                name="museum_22"
                castShadow
                receiveShadow
                geometry={nodes.museum_22.geometry}
                material={materials.Architecture_LM_5}
              />
              <mesh
                name="museum_23"
                castShadow
                receiveShadow
                geometry={nodes.museum_23.geometry}
                material={materials.Architecture_LM_2}
              />
              <mesh
                name="museum_24"
                castShadow
                receiveShadow
                geometry={nodes.museum_24.geometry}
                material={materials.Architecture_LM_1}
              />
              <mesh
                name="museum_25"
                castShadow
                receiveShadow
                geometry={nodes.museum_25.geometry}
                material={materials.Architecture_LM_4}
              />
            </group>
            <group name="museum_tan">
              <mesh
                name="museum_tan_1"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_1.geometry}
                material={materials.ArtworkFrame_LM_2}
              />
              <mesh
                name="museum_tan_2"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_2.geometry}
                material={materials.ArtworkFrame_LM_1}
              />
              <mesh
                name="museum_tan_3"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_3.geometry}
                material={materials.ArtworkFrameOrnamented_LM_1}
              />
              <mesh
                name="museum_tan_4"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_4.geometry}
                material={materials.Ceramic_LM_1}
              />
              <mesh
                name="museum_tan_5"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_5.geometry}
                material={materials.Ceramic_LM_5}
              />
              <mesh
                name="museum_tan_6"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_6.geometry}
                material={materials.Ceramic_LM_4}
              />
              <mesh
                name="museum_tan_7"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_7.geometry}
                material={materials.Ceramic_LM_3}
              />
              <mesh
                name="museum_tan_8"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_8.geometry}
                material={materials.Ceramic_LM_6}
              />
              <mesh
                name="museum_tan_9"
                castShadow
                receiveShadow
                geometry={nodes.museum_tan_9.geometry}
                material={materials.Ceramic_LM_2}
              />
            </group>
            <mesh
              name="SkyDome"
              geometry={nodes.SkyDome.geometry}
              material={material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('assets/models/museum.glb');
