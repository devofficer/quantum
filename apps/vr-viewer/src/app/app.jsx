import React, { Suspense } from 'react';
import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { KEYBOARD_MAP, SCENES } from './constants/enums';
import { Museum } from 'scenes/Museum';
import Light from 'components/Light';
import Universe from 'scenes/Universe';
import useQuasarStore from 'store';

function App() {
  const activeScene = useQuasarStore((state) => state.activeScene);

  return (
    <div className="w-full h-screen">
      <KeyboardControls map={KEYBOARD_MAP}>
        <Canvas shadows>
          <Light />
          <Suspense fallback={null}>
            {activeScene === SCENES.universe ? <Universe /> : <Museum />}
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
