import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const useFBXLoader = (url, initHandler = null) => {
  const obj = useLoader(FBXLoader, url);

  if (initHandler) {
    initHandler(obj);
  }

  return obj;
};

export default useFBXLoader;
