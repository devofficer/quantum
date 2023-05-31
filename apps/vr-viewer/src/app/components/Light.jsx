import { DirectionalLight, Color } from 'three';

const Light = () => {
  const light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(-90, 90, 90);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.001;
  light.shadow.mapSize.width = Math.pow(2, 12);
  light.shadow.mapSize.height = Math.pow(2, 12);
  light.shadow.camera.near = 0.001;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.left = 20;
  light.shadow.camera.right = -20;
  light.shadow.camera.top = 20;
  light.shadow.camera.bottom = -20;

  return (
    <>
      <hemisphereLight
        color={new Color().setHSL(0.6, 1, 0.6)}
        intensity={0.6}
      />
      /
      <directionalLight {...light} />
      <ambientLight intensity={0.1} />
    </>
  );
};

export default Light;
