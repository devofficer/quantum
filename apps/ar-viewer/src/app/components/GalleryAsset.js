/* eslint-disable import/no-anonymous-default-export */
import React, {
  memo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import GifLoader from 'three-gif-loader';
import useStore from '../store';
import { useGLTF } from '@react-three/drei';

const gifLoader = new GifLoader();
const textureLoader = new THREE.TextureLoader();

const outerFrameColor = '#000';
const innerFrameColor = '#fff';

const GalleryAsset = ({
  initialPosition,
  initialRotation,
  activePosition,
  url,
  title,
  description,
  frame,
  externalLink,
  type,
  id,
}) => {
  const setItemDetails = useStore((state) => state.setItemDetails);
  const itemDetails = useStore((state) => state.itemDetails);
  const video = type === 'video' ? document.createElement('video') : false;

  const [videoEl, setVideoEl] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [imageDims, setImageDims] = useState(null);
  const [texture, setTexture] = useState(null);
  const groupRef = useRef();
  const assetRef = useRef();
  const mountRef = useRef();
  const outerMountRef = useRef();
  const frameRef = useRef();

  // TESTING FRAMES

  useEffect(() => {
    const texture = () => {
      if (type === 'video') {
        video.setAttribute('id', id);
        video.src = url;
        video.muted = true;
        video.loop = true;
        video.autoplay = false;
        video.crossOrigin = 'anonymous';
        video.playsInline = true;
        video.currentTime = 1;
        video.oncanplaythrough = () => {
          setImageDims({
            width: video.videoWidth,
            height: video.videoHeight,
            aspectRatio: video.videoHeight / video.videoWidth,
          });
          setVideoEl(video);
        };
        return new THREE.VideoTexture(video);
      } else if (type === 'gif') {
        return gifLoader.load(url, (image) => {
          const { width, height } = image;
          if (width === 0 || height === 0) return;
          setImageDims({ width, height, aspectRatio: height / width });
        });
      } else {
        return textureLoader.load(url, ({ image }) => {
          const { width, height } = image;
          if (width === 0 || height === 0) return;
          setImageDims({ width, height, aspectRatio: height / width });
        });
      }
    };

    setTexture(texture);
  }, [id, type, url]); // Warning... do NOT add 'video' into the callback array. It will cause an infinite loop.

  const _handleClick = () => {
    if (videoEl) {
      if (!isClicked) {
        videoEl.currentTime = 0;
        videoEl.play();
        videoEl.muted = false;
      } else {
        var isPlaying =
          videoEl.currentTime > 0 &&
          !videoEl.paused &&
          !videoEl.ended &&
          videoEl.readyState > videoEl.HAVE_CURRENT_DATA;
        if (isPlaying) {
          videoEl.pause();
        }
      }
    }
    setIsClicked((isClicked) => !isClicked);
    setItemDetails(
      !isClicked
        ? {
            id: id,
            title: title,
            description: description,
            externalLink: externalLink,
          }
        : null,
    );
  };

  useEffect(() => {
    if (!itemDetails || itemDetails.id !== id) {
      setIsClicked(false);
    }
  }, [itemDetails]);

  const { position, rotation } = useSpring({
    position: isClicked ? activePosition : initialPosition,
    rotation: isClicked
      ? [
          initialRotation[0],
          initialRotation[1] + Math.PI * 2,
          initialRotation[2],
        ]
      : initialRotation,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  useEffect(() => {
    if (!imageDims) return;
    const { aspectRatio } = imageDims;
    const scaleMultiplier = 0.65;
    const assetBounds = [scaleMultiplier / aspectRatio, scaleMultiplier];
    assetRef.current.scale.set(...assetBounds);
    const mountPadding = 0.1;

    mountRef.current.scale.set(
      ...assetBounds.map((bound) => bound + mountPadding),
    );

    outerMountRef.current.scale.set(
      ...assetBounds.map((bound) => bound + mountPadding + 0.1),
    );

    const frameBox = new THREE.Box3().setFromObject(frameRef.current);

    let frameBounds = {
      x: Math.abs(frameBox.max.x - frameBox.min.x),
      y: Math.abs(frameBox.max.y - frameBox.min.y),
    };

    let outerMountBounds = {
      x: Math.abs(outerMountRef.current.scale.x),
      y: Math.abs(outerMountRef.current.scale.y),
    };

    let lengthRatios = [
      outerMountBounds.x / frameBounds.x,
      outerMountBounds.y / frameBounds.y,
    ];

    frameRef.current.scale.set(lengthRatios[0], lengthRatios[1], 0.01);
  }, [imageDims, url]);

  // To move out when fixed

  const Frame = ({ frameSrc, imageSrc }) => {
    const frameModel = useGLTF(frameSrc);

    useEffect(() => {
      frameModel?.scene?.traverse((node) => {
        if (node.isMesh) {
          if (node.name.includes('mesh_3_instance_0')) {
            node.material.map = textureLoader.load(imageSrc);
            node.needsUpdate = true;
          }
        }
      });
    }, [frameModel, imageSrc]);

    return <primitive object={frameModel.scene} />;
  };

  return (
    <animated.group ref={groupRef} position={position} rotation={rotation}>
      <animated.group ref={frameRef}>
        <Frame
          frameSrc={
            'https://storage.googleapis.com/assets.quasarsofficial.com/ar-demo/frahms/Ambience_Curio_Cards_black_gold-v1.glb'
          }
          imageSrc={url}
        />
      </animated.group>
      <mesh position={[0, 0, -0.01]} ref={outerMountRef}>
        <planeGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color={'#000'}
          side={THREE.FrontSide}
          transparent={true}
        />
      </mesh>
      <mesh position={[0, 0, -0.0]} ref={mountRef}>
        <planeGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color={'#fff'}
          side={THREE.FrontSide}
          transparent={true}
        />
      </mesh>
      <mesh
        ref={assetRef}
        position={[0, 0, 0.02]}
        rotation={[0, 0, 0]}
        onClick={() => _handleClick()}
      >
        <planeGeometry attach="geometry" />
        <meshStandardMaterial
          side={THREE.FrontSide}
          attach="material"
          map={texture}
        />
      </mesh>
    </animated.group>
  );
};

export default GalleryAsset;
