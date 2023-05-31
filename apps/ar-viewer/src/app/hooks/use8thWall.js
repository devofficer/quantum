import { useEffect, useState } from 'react';
import * as THREE from 'three';
import useStore from '../store';
import use8thWallScripts from './use8thWallScripts';

export const use8thWall = (appKey, canvas) => {
  const areScriptsReady = true; // use8thWallScripts(appKey); // This is injecting the scripts twice and giving the console XR error
  const [XR8Object, setXR8Object] = useState(null);
  const [ThreeObject, setThreeObject] = useState(null);
  const isDesktopMode = useStore((state) => state.isDesktopMode);

  useEffect(() => {
    if (!XR8Object && areScriptsReady && canvas) {
      const { XRExtras } = window;

      XRExtras.Loading.showLoading({
        onxrloaded: () => {
          const { XR8 } = window;
          window.THREE = THREE;

          XR8.XrController.configure({
            disableWorldTracking: false,
            enableLighting: true,
            enableWorldPoints: false,
          });
          XR8.addCameraPipelineModules([
            XR8.GlTextureRenderer.pipelineModule(),
            XR8.Threejs.pipelineModule(),
            XR8.XrController.pipelineModule(),
            // XR8.CanvasScreenshot.pipelineModule(),
            XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
            XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
            XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
          ]);

          XR8.addCameraPipelineModule({
            name: 'quasars',
            onAttach: () => {
              setXR8Object(XR8);
              setThreeObject({
                scene: XR8.Threejs.xrScene().camera,
                camera: XR8.Threejs.xrScene().scene,
              });
            },
            onStart: ({ canvas }) => {
              const { camera, renderer } = XR8.Threejs.xrScene(); // Get the 3js sceen from xr3js.
              // renderer.outputEncoding = THREE.sRGBEncoding;

              canvas.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2 && !isDesktopMode) {
                  XR8.XrController.recenter();
                }
              });

              // Sync the xr controller's 6DoF position and camera paremeters with our scene.
              XR8.XrController.updateCameraProjectionMatrix({
                origin: camera.position,
                facing: camera.quaternion,
              });
            },
          });

          XR8.run({
            canvas,
            antialias: true,
            allowedDevices: XR8.XrConfig.device().ANY, //XR8.XrConfig.device().MOBILE_AND_HEADSETS
            sessionConfiguration: {
              defaultEnvironment: {
                disabled: true,
              },
            },
          });
        },
      });
    }
  }, [XR8Object, areScriptsReady, canvas]);

  return {
    XR8: XR8Object,
    XR8Three: ThreeObject,
  };
};

export default use8thWall;
