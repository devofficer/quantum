import { useMemo, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import GifLoader from 'three-gif-loader';
import { ASSET_TYPES } from 'constants/enums';
import { TextureLoader, VideoTexture } from 'three';

const useGalleryAsset = ({ type, url }) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  const [videoElement, setVideoElement] = useState(null);
  const loader = useMemo(() => {
    if (type === ASSET_TYPES.gif) {
      return GifLoader;
    } else if (type === ASSET_TYPES.image) {
      return TextureLoader;
    }
  }, [type]);

  const texture = useLoader(loader, url);
  const videoTexture = useMemo(() => {
    if (type !== ASSET_TYPES.video) {
      return null;
    }
    const video = document.createElement('video');
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.autoplay = false;
    video.crossOrigin = 'anonymous';
    video.playsInline = true;
    video.currentTime = 1;
    video.oncanplaythrough = () => {
      setAspectRatio(video.videoHeight / video.videoWidth);
      setVideoElement(video);
    };
    return new VideoTexture(video);
  }, [type, url]);

  if (type === ASSET_TYPES.video) {
    return videoElement
      ? {
          texture: videoTexture,
          aspectRatio,
          videoElement,
        }
      : {
          texture: null,
          aspectRatio,
          videoElement: null,
        };
  } else {
    return {
      texture,
      aspectRatio: texture.image.height / texture.image.width,
    };
  }
};

export default useGalleryAsset;
