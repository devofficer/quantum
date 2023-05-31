/* eslint-disable jsx-a11y/no-redundant-roles */
import React, {
  memo,
  Suspense,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
// import { Stats } from '@react-three/drei';
import FadeIn from 'react-fade-in';
import { Environment, Html, useProgress } from '@react-three/drei';
import { CircleProgress } from 'react-gradient-progress';
import ControlCenter from '../components/ControlCenter';
import TopBar from '../components/TopBar';
import use8thWall from '../hooks/use8thWall';
import Experience from '../components/Experience';
import { AdaptiveDpr, Preload, Stats } from '@react-three/drei';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize } from 'postprocessing';

function Catcher() {
  const [canvasEl, setCanvasEl] = useState();

  const { XR8 } = use8thWall(process.env.NX_APP_8THWALL_API_KEY, canvasEl);

  const dimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  // const Loader = () => {
  //   const { progress } = useProgress();

  //   return (
  //     <group position={[0, 0.5, -5]}>
  //       <Html center>
  //         <CircleProgress
  //           percentage={Number(progress.toFixed())}
  //           strokeWidth={10}
  //         />
  //       </Html>
  //     </group>
  //   );
  // };

  const isReadyScene = useMemo(() => XR8 && XR8.Threejs.xrScene(), [XR8]);

  useLayoutEffect(() => {
    setCanvasEl(document.getElementsByTagName('canvas')[0]);
  }, []);

  const { height, width } = dimensions;

  return (
    <FadeIn delay={250} transitionDuration={2000}>
      {isReadyScene && (
        <>
          <TopBar />
          <ControlCenter />
        </>
      )}

      <Canvas
        gl={{ preserveDrawingBuffer: false }}
        style={{ height: height, width: width }}
        dpr={[1, 2]}
        shadows={false}
      >
        {isReadyScene && (
          <Suspense fallback={null}>
            <Experience XR8={XR8} />
          </Suspense>
        )}
        <Preload all />
        <AdaptiveDpr pixelated />
        {/* <EffectComposer multisampling={0} disableNormalPass={true}>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom
            intensity={0.1} // The bloom intensity.
            blurPass={BlurPass} // A blur pass.
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.HUGE} // blur kernel size
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.5} // smoothness of the luminance threshold. Range is [0, 1]
          />
        </EffectComposer> */}
        <Environment preset="warehouse" />
      </Canvas>
    </FadeIn>
  );
}

export default memo(Catcher);
