import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import useStore from '../store';

const Quasar = ({ model, initialRotation }) => {
  const quasarRef = useRef();
  const isCaught = useStore((state) => state.isCaught);
  const catchQuasar = useStore((state) => state.catchQuasar);
  const isDesktopMode = useStore((state) => state.isDesktopMode);

  const { gl } = useThree();

  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  useEffect(() => {
    model?.scene?.traverse((node) => {
      if (node.isMesh) {
        // removes the inner sphere to avoid z-fighting
        if (node.name.includes('QUASAR_INNER_SPHERE')) {
          setTimeout(
            () => {
              node.visible = false;
            },
            isCaught ? 0 : 500,
          );
        }

        node.material.envMapIntensity = 1;
        node.material.maxAnisotropy = maxAnisotropy;
      }
    });
  }, [isCaught, model, maxAnisotropy]);

  const recenter = () => {
    if (isDesktopMode) return;
    const { XR8 } = window;
    XR8.XrController.recenter();
  };

  const handleTap = () => {
    if (!isCaught) {
      recenter();
      catchQuasar();
    }
  };

  useFrame((state, delta) => {
    quasarRef.current.rotation.y -= delta * 0.075;
  });

  return (
    <primitive
      onClick={(e) => {
        if (isCaught) return;
        e.stopPropagation();
        handleTap();
      }}
      ref={quasarRef}
      scale={[0.05, 0.05, 0.05]}
      rotation={initialRotation}
      object={model.scene}
    />
  );
};

export default Quasar;
