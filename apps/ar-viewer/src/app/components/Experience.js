import { memo, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import useStore from '../store';
import Core from './Core';
import { disposeAll } from '../utils/disposeAll';
import axios from 'axios';
import * as THREE from 'three';

const Experience = ({ XR8 }) => {
  const { renderer, scene, camera } = XR8.Threejs.xrScene();
  const setDefaultCamera = useThree(({ set }) => set);
  const npointId = useStore((state) => state.npointId);
  const activeQuasar = useStore((state) => state.activeQuasar);
  const setProjectData = useStore((state) => state.setProjectData);
  const selectedQuasar = useStore((state) => state.selectedQuasar);

  useEffect(() => {
    console.log('Load remote data');
    // not sure if this is fully clearing the scene
    disposeAll(scene);
    renderer.renderLists.dispose();
    axios
      .get(`https://api.npoint.io/${npointId}`)
      .then((response) => {
        setProjectData(response.data, selectedQuasar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [npointId, selectedQuasar, setProjectData]);

  const appRef = useRef();

  useEffect(() => {
    if (scene && activeQuasar && camera) {
      console.log('Init Scene');
      // Add the app to 8thWall's ThreeJS scene
      scene.add(appRef.current);
      const light = new THREE.PointLight(0xffffff, 0.5, 100);
      light.position.set(0, 0, 0);
      camera.add(light);
      camera.position.y = 1.8;
      // Set the default camera to use ThreeJS's camera
      setDefaultCamera({
        camera,
        scene,
      });
    }
  }, [scene, camera, activeQuasar, setDefaultCamera]);

  return <group ref={appRef}>{activeQuasar && <Core />}</group>;
};

export default Experience;
