import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';
import {
  createAttractor,
  updateAttractor,
  dadrasAttractor,
  aizawaAttractor,
  arneodoAttractor,
  dequanAttractor,
  lorenzAttractor,
  lorenzMod2Attractor,
} from './attractor';

const simulation = () =>
  Random.pick([
    dadrasAttractor,
    aizawaAttractor,
    arneodoAttractor,
    dequanAttractor,
    lorenzAttractor,
    lorenzMod2Attractor,
  ]);

function StormLine({ radius, simulation, width, color }) {
  const line = useRef();

  useFrame(() => {
    if (line.current) {
      const nextPosition = updateAttractor(
        currentPosition,
        radius,
        simulation,
        0.01,
      );
      line.current.advance(nextPosition);
    }
  });

  const [positions, currentPosition] = useMemo(() => createAttractor(5), []);

  return (
    <mesh>
      <meshLine ref={line} attach="geometry" points={positions} />
      <meshLineMaterial
        transparent
        lineWidth={width}
        color={color}
        opacity={0.75}
      />
    </mesh>
  );
}

export function SparkStorm({ count, colors, radius = 0.3, isDesktopMode }) {
  const width = isDesktopMode ? (0.001, 0.003) : (0.005, 0.01);
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => {
        return {
          color: Random.pick(colors),
          width: width,
          speed: Random.range(0.01, 0.02),
          simulation: simulation(),
          radius: Random.range(1, 2.25) * radius,
        };
      }),
    [count, colors, width, radius],
  );

  return (
    <group>
      {lines.map((props, index) => (
        <StormLine key={index} {...props} />
      ))}
    </group>
  );
}
