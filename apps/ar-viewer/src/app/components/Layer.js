import React, { Fragment, useMemo, memo, useEffect, useState } from 'react';
import GalleryAsset from './GalleryAsset';
import useStore from '../store';
import { calculatePositions } from '../utils/math';
import { Preload } from '@react-three/drei';

const Layer = ({ levelIndex }) => {
  const activeQuasar = useStore((state) => state.activeQuasar);
  const [isHidden, setIsHidden] = useState(false);

  const calculatedGalleryLayout = useMemo(() => {
    return activeQuasar.gallery.map((item, index) => {
      return calculatePositions(item.assets, 10);
    });
  }, [activeQuasar]);

  const assetGallery = calculatedGalleryLayout[levelIndex];

  useEffect(() => {
    setIsHidden(true);
    setTimeout(() => {
      setIsHidden(false);
    }, 500);
  }, [levelIndex]);

  return (
    <group visible={!isHidden}>
      {assetGallery.map((asset, index) => {
        return (
          <Fragment key={index}>
            <GalleryAsset
              initialPosition={[asset.x, asset.y, asset.z]}
              initialRotation={[0, asset.rotation, 0]}
              activePosition={[asset.activeX, asset.activeY, asset.activeZ]}
              url={asset.url}
              type={asset.type}
              externalLink={asset?.externalLink}
              title={asset?.title}
              description={asset?.description}
              id={`asset-${index}-levelIndex-${levelIndex}`}
            />
          </Fragment>
        );
      })}
    </group>
  );
};

// https://codesandbox.io/s/jflps?file=/src/App.js:2700-2714
// https://codesandbox.io/s/bloom-hdr-workflow-gltf-whnhyr?file=/src/App.js

export default memo(Layer);