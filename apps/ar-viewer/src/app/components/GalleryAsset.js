/* eslint-disable import/no-anonymous-default-export */
import React, { memo, useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import GifLoader from 'three-gif-loader';
import useStore from '../store';

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
  externalLink,
  type,
  id,
}) => {
  const setItemDetails = useStore((state) => state.setItemDetails);
  const itemDetails = useStore((state) => state.itemDetails);
  const video = type === 'video' ? document.createElement('video') : false;
  const [videoEl, setVideoEl] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [imageDims, setImageDims] = useState({
    width: 0,
    height: 0,
    aspectRatio: 1,
  });
  const [texture, setTexture] = useState(null);

  const groupRef = useRef();
  const meshRef = useRef();

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
  }, [id, type, url, video]);

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
    console.log('title', title);
    setItemDetails(
      !isClicked
        ? {
            id: id,
            title: title,
            description: description,
            externalLink: externalLink,
          }
        : null
    );
  };

  useEffect(() => {
    if (!itemDetails || itemDetails.id !== id) {
      setIsClicked(false);
    }
  }, [itemDetails]);

  const { position, rotation } = useSpring({
    position: isClicked ? activePosition : initialPosition,
    rotation: initialRotation,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  useEffect(() => {
    if (!texture) return;
    texture.center = new THREE.Vector2(0.5, 0.5);
    texture.rotation = Math.PI;
    texture.flipY = false;
    // dont stretch the texture
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
  }, [texture]);

  useEffect(() => {
    const { aspectRatio } = imageDims;
    const scaleMultiplier = 3;
    groupRef.current.scale.set(
      scaleMultiplier / aspectRatio,
      scaleMultiplier,
      1
    );
  }, [imageDims]);

  return (
    <animated.group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={() => _handleClick()}
    >
      <mesh position={[0, 0, 0]} scale={[1.2, 1.2, 1]} rotation={[0, 2.3, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[1.2, 1.2, 1.2, 32, 1, true, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          attach="material"
          color={outerFrameColor}
          side={THREE.BackSide}
          castShadow
          transparent={true}
          opacity={1}
        />
      </mesh>
      <mesh
        position={[0, 0, 0.01]}
        scale={[1.2, 1.2, 1]}
        rotation={[0, 2.3, 0]}
      >
        <cylinderGeometry
          attach="geometry"
          args={[1.1, 1.1, 1.1, 32, 1, true, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          attach="material"
          color={innerFrameColor}
          side={THREE.BackSide}
          transparent={true}
          opacity={1}
        />
      </mesh>

      <mesh
        ref={meshRef}
        position={[0, 0, 0.02]}
        scale={[1.2, 1.2, 1]}
        rotation={[0, 2.3, 0]}
      >
        <cylinderGeometry
          attach="geometry"
          args={[1, 1, 1, 32, 1, true, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          side={THREE.BackSide}
          attach="material"
          map={texture}
        />
      </mesh>
    </animated.group>
  );
};

export default memo(GalleryAsset);
