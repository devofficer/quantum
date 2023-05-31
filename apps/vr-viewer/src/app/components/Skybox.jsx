import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    'assets/textures/skybox/front.png',
    'assets/textures/skybox/back.png',
    'assets/textures/skybox/up.png',
    'assets/textures/skybox/down.png',
    'assets/textures/skybox/right.png',
    'assets/textures/skybox/left.png',
  ]);

  scene.background = texture;

  return null;
};

export default Skybox;
