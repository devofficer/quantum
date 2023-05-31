import { useSpring, animated } from '@react-spring/three';
import React, {
  useRef,
  memo,
  useMemo,
  useEffect,
  Fragment,
  useState,
} from 'react';
import * as THREE from 'three';
import useStore from '../store';
import { calculatePositions } from '../utils/calculatePositions';

import { useFrame } from '@react-three/fiber';
import randomcolor from 'randomcolor';
import GalleryAsset from './GalleryAsset';

const Gallery = ({ model }) => {
  const groupRef = useRef();
  const domeRef = useRef();

  const [layerIndex, setLayerIndex] = useState(0);
  const currentLevel = useStore((state) => state.currentLevel);

  const activeQuasar = useStore((state) => state.activeQuasar);

  const galleryRadius = 2;

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
    scale: 1,
    rotation: [0, Math.PI, 0],
    config: { friction: 40, duration: 500 },
    immediate: false,

    onRest: () => {
      api.start((i) => {
        return {
          position: [0, 0, 0],
          scale: 1,
        };
      });
    },
  }));

  useEffect(() => {
    if (currentLevel === layerIndex) return;
    setTimeout(() => {
      setLayerIndex(currentLevel);
    }, 500);
    api.start((i) => {
      return {
        position: [0, -5, 0],
        scale: 0.5,
      };
    });
  }, [api, currentLevel, layerIndex]);

  // useFrame((state, delta) => {
  //   if (!isDesktopMode || itemDetails) return;
  //   groupRef.current.rotation.y += delta * 0.075;
  // });

  const assetGallery = calculatePositions(
    activeQuasar.gallery[currentLevel].assets,
    galleryRadius - 0.2,
  ).splice(0, 3);

  const meshMaterial = {
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    thickness: 3,
    roughness: 0.6,
    clearcoat: 0.9,
    clearcoatRoughness: 0.3,
    transmission: 1,
    // ior: 1.2,
    envMapIntensity: 5,
    attenuationDistance: 5,
  };

  const Ring = ({ offset, isRandom }) => {
    return (
      <mesh position={[0, offset, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[galleryRadius, galleryRadius, 0.1, 32, 1, true]}
        />
        <meshPhysicalMaterial
          attach="material"
          {...meshMaterial}
          color={isRandom ? randomcolor() : '#fff'}
        />
      </mesh>
    );
  };

  useEffect(() => {
    model?.scene?.traverse((node) => {
      if (node.isMesh) {
        if (node.name.includes('QUASAR_SKIN_OUT_M_003')) {
          domeRef.current.material = node.material;
          domeRef.current.material.envMapIntensity = 1;
        }
      }
    });
  }, [model]);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} ref={domeRef}>
        <sphereGeometry
          attach="geometry"
          args={[galleryRadius + 0.1, 32, 32, 0, Math.PI * 2, 0, 1.4]}
        />
        <meshStandardMaterial
          attach="material"
          side={THREE.DoubleSide}
          opacity={0.5}
          color={'#fff'}
        />
      </mesh>

      <Ring offset={-0.22} isRandom />
      <Ring offset={-0.11} />
      <Ring offset={0} isRandom />
      <Ring offset={0.11} />
      <Ring offset={0.22} isRandom />

      <animated.group {...spring}>
        {assetGallery?.map((asset, index) => {
          return (
            <Fragment key={index}>
              <GalleryAsset
                initialPosition={[asset.x, asset.y, asset.z]}
                initialRotation={[0, asset.rotation, 0]}
                activePosition={[asset.activeX, asset.activeY, asset.activeZ]}
                url={asset.url}
                type={asset.type}
                externalLink={asset?.externalLink}
                title={asset?.title}
                description={asset?.description}
                frame={asset?.frame}
                id={`asset-${index}-levelIndex-${currentLevel}`}
              />
            </Fragment>
          );
        })}
      </animated.group>
      <hemisphereLight intensity={0.3} />
    </group>
  );
};

// https://codesandbox.io/s/jflps?file=/src/App.js:2700-2714

export default Gallery;
