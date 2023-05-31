import { memo, Suspense, useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import Quasar from './Quasar';
import Gallery from './Gallery';
import useStore from '../store';
import { MeshLine, MeshLineMaterial } from './MeshLine';
import { extend } from '@react-three/fiber';
import { PresentationControls, Shadow, useGLTF } from '@react-three/drei';
import { SparkStorm } from './Sparks/SparkStorm';

extend({ MeshLine, MeshLineMaterial });

const Experience = () => {
  const groupRef = useRef();

  const isCaught = useStore((state) => state.isCaught);
  const activeQuasar = useStore((state) => state.activeQuasar);
  const isDesktopMode = useStore((state) => state.isDesktopMode);
  const groupYPos = isDesktopMode ? 1.5 : 2;
  const quasarModel = useGLTF(activeQuasar.modelSrc);

  const { groupPosition } = useSpring({
    groupPosition: isCaught
      ? [0, groupYPos, isDesktopMode ? -1 : 0]
      : [0, groupYPos, -2],
  });

  const { quasarScale, quasarPosition } = useSpring({
    quasarScale: isCaught
      ? isDesktopMode
        ? [0.3, 0.3, 0.3]
        : [20, 20, 20]
      : isDesktopMode
      ? [0.5, 0.5, 0.5]
      : [0.7, 0.7, 0.7],
    quasarPosition: isCaught ? [0, 0, 0] : [0, 0, 0],
    config: { mass: 0.7, tension: 200, friction: 20 },
  });

  const { sparkScale } = useSpring({
    sparkScale: isCaught ? [0, 0, 0] : [1, 1, 1],
  });

  const { shellScale, shellPosition } = useSpring({
    shellScale: isCaught ? [1, 1, 1] : [0.01, 0.01, 0.01],
    shellPosition: isCaught ? [0, 0, 0] : [0, 3, 0],
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const { palette, gallery, initialRotation } = activeQuasar;

  return (
    <>
      <animated.group ref={groupRef} position={groupPosition} scale={[1, 1, 1]}>
        <PresentationControls
          enabled={true}
          global={false}
          cursor={true}
          snap={isDesktopMode ? !isCaught : true}
          speed={2}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[0, Math.PI / 2]}
          azimuth={[-Infinity, Infinity]}
          config={{ mass: 1, tension: 170, friction: 20 }}
        >
          {/* <animated.group scale={quasarScale} position={quasarPosition}>
            <Quasar model={quasarModel} initialRotation={initialRotation} />
          </animated.group> */}

          <animated.group
            scale={sparkScale}
            visible={isDesktopMode ? true : !isCaught}
          >
            <SparkStorm
              count={100}
              colors={palette}
              isDesktopMode={isDesktopMode}
            />
          </animated.group>

          <animated.group scale={shellScale} position={shellPosition}>
            {gallery.length && <Gallery model={quasarModel} />}
          </animated.group>
        </PresentationControls>
      </animated.group>

      <Shadow position={[0, -2, -4]} color="black" opacity={0.75} scale={3} />
    </>
  );
};

useGLTF.preload();

export default memo(Experience);
