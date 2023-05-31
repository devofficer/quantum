import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader';
import { MeshStandardMaterial } from 'three';

export function Museum(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('assets/museum.glb');
  const { actions } = useAnimations(animations, group);

  const ktxLoader = new KTXLoader();
  const texture = ktxLoader.load('assets/textures/skybox.ktx');
  const material = new MeshStandardMaterial({ map: texture });

  useEffect(() => {
    if (actions.Main) {
      actions.Main.play();
    }
  }, [actions]);

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
                <PerspectiveCamera fov={100} makeDefault />
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
            <group name="museum">
              <mesh
                name="museum_1"
                geometry={nodes.museum_1.geometry}
                material={materials.ArtworkHover_050}
              />
              <mesh
                name="museum_2"
                geometry={nodes.museum_2.geometry}
                material={materials.ArtworkHover_052}
              />
              <mesh
                name="museum_3"
                geometry={nodes.museum_3.geometry}
                material={materials.ArtworkHover_063}
              />
              <mesh
                name="museum_4"
                geometry={nodes.museum_4.geometry}
                material={materials.ArtworkHover_069}
              />
              <mesh
                name="museum_5"
                geometry={nodes.museum_5.geometry}
                material={materials.ArtworkHover_080}
              />
              <mesh
                name="museum_6"
                geometry={nodes.museum_6.geometry}
                material={materials.ArtworkHover_083}
              />
              <mesh
                name="museum_7"
                geometry={nodes.museum_7.geometry}
                material={materials.ArtworkHover_109}
              />
              <mesh
                name="museum_8"
                geometry={nodes.museum_8.geometry}
                material={materials.ArtworkCanvas_050_LM_1}
              />
              <mesh
                name="museum_9"
                geometry={nodes.museum_9.geometry}
                material={materials.ArtworkCanvas_052_LM_1}
              />
              <mesh
                name="museum_10"
                geometry={nodes.museum_10.geometry}
                material={materials.ArtworkCanvas_063_LM_1}
              />
              <mesh
                name="museum_11"
                geometry={nodes.museum_11.geometry}
                material={materials.ArtworkCanvas_069_LM_1}
              />
              <mesh
                name="museum_12"
                geometry={nodes.museum_12.geometry}
                material={materials.ArtworkCanvas_080_LM_1}
              />
              <mesh
                name="museum_13"
                geometry={nodes.museum_13.geometry}
                material={materials.ArtworkCanvas_083_LM_1}
              />
              <mesh
                name="museum_14"
                geometry={nodes.museum_14.geometry}
                material={materials.ArtworkCanvas_109_LM_1}
              />
              <mesh
                name="museum_15"
                geometry={nodes.museum_15.geometry}
                material={materials.Floor_LM_3}
              />
              <mesh
                name="museum_16"
                geometry={nodes.museum_16.geometry}
                material={materials.Floor_LM_4}
              />
              <mesh
                name="museum_17"
                geometry={nodes.museum_17.geometry}
                material={materials.Floor_LM_2}
              />
              <mesh
                name="museum_18"
                geometry={nodes.museum_18.geometry}
                material={materials.Floor_LM_1}
              />
              <mesh
                name="museum_19"
                geometry={nodes.museum_19.geometry}
                material={materials.Architecture_LM_3}
              />
              <mesh
                name="museum_20"
                geometry={nodes.museum_20.geometry}
                material={materials.FloorPattern_LM_1}
              />
              <mesh
                name="museum_21"
                geometry={nodes.museum_21.geometry}
                material={materials.Architecture_LM_6}
              />
              <mesh
                name="museum_22"
                geometry={nodes.museum_22.geometry}
                material={materials.Architecture_LM_5}
              />
              <mesh
                name="museum_23"
                geometry={nodes.museum_23.geometry}
                material={materials.Architecture_LM_2}
              />
              <mesh
                name="museum_24"
                geometry={nodes.museum_24.geometry}
                material={materials.Architecture_LM_1}
              />
              <mesh
                name="museum_25"
                geometry={nodes.museum_25.geometry}
                material={materials.Architecture_LM_4}
              />
            </group>
            <group name="museum_tan">
              <mesh
                name="museum_tan_1"
                geometry={nodes.museum_tan_1.geometry}
                material={materials.ArtworkFrame_LM_2}
              />
              <mesh
                name="museum_tan_2"
                geometry={nodes.museum_tan_2.geometry}
                material={materials.ArtworkFrame_LM_1}
              />
              <mesh
                name="museum_tan_3"
                geometry={nodes.museum_tan_3.geometry}
                material={materials.ArtworkFrameOrnamented_LM_1}
              />
              <mesh
                name="museum_tan_4"
                geometry={nodes.museum_tan_4.geometry}
                material={materials.Ceramic_LM_1}
              />
              <mesh
                name="museum_tan_5"
                geometry={nodes.museum_tan_5.geometry}
                material={materials.Ceramic_LM_5}
              />
              <mesh
                name="museum_tan_6"
                geometry={nodes.museum_tan_6.geometry}
                material={materials.Ceramic_LM_4}
              />
              <mesh
                name="museum_tan_7"
                geometry={nodes.museum_tan_7.geometry}
                material={materials.Ceramic_LM_3}
              />
              <mesh
                name="museum_tan_8"
                geometry={nodes.museum_tan_8.geometry}
                material={materials.Ceramic_LM_6}
              />
              <mesh
                name="museum_tan_9"
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

useGLTF.preload('assets/museum.glb');
