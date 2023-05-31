import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX, useKeyboardControls } from '@react-three/drei';
import { AnimationMixer, Quaternion, Vector3 } from 'three';
import { useFBXLoader } from 'hooks';

const Character = () => {
  const character = useRef(null);
  const chObj = useFBXLoader('assets/models/character/pose.fbx', (obj) => {
    obj.scale.setScalar(0.1);
    obj.traverse((o) => {
      o.castShadow = true;
      o.receiveShadow = true;
    });
  });
  const controls = useKeyboardControls((state) => state);
  const mixer = useMemo(() => new AnimationMixer(chObj), [chObj]);
  const idleAnim = useFBX('assets/models/character/idle.fbx');
  const walkAnim = useFBX('assets/models/character/walk.fbx');
  const runAnim = useFBX('assets/models/character/run.fbx');
  const jumpAnim = useFBX('assets/models/character/jump.fbx');
  const animations = useMemo(
    () => ({
      idle: mixer.clipAction(idleAnim.animations[0]),
      walk: mixer.clipAction(walkAnim.animations[0]),
      run: mixer.clipAction(runAnim.animations[0]),
      jump: mixer.clipAction(jumpAnim.animations[0]),
    }),
    [mixer, idleAnim, walkAnim, runAnim, jumpAnim],
  );
  const currAction = useRef(animations.idle);
  const prevAction = useRef(null);

  const currPos = useRef(new Vector3());
  const currLookAt = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const decceleration = useRef(new Vector3(-0.0005, -0.0001, -5.0));
  const acceleration = useRef(new Vector3(1, 0.125, 100.0));

  const calcOffset = () => {
    const offset = new Vector3(0, 60, -100);
    offset.applyQuaternion(character.current.quaternion);
    offset.add(character.current.position);
    return offset;
  };

  const calcLookAt = () => {
    const lookat = new Vector3(0, 0, 0);
    lookat.applyQuaternion(character.current.quaternion);
    lookat.add(character.current.position);
    return lookat;
  };

  function updateCamera(camera, delta) {
    const offset = calcOffset();
    const lookat = calcLookAt();

    const t = 1.0 - Math.pow(0.001, delta);
    currPos.current.lerp(offset, t);
    currLookAt.current.lerp(lookat, t);

    camera.position.copy(currPos.current);
    camera.lookAt(lookat);
    camera.updateProjectionMatrix();
  }

  const updateTransform = (delta) => {
    const frameDeceeleration = new Vector3(
      velocity.current.x * decceleration.current.x,
      velocity.current.y * decceleration.current.y,
      velocity.current.z * decceleration.current.z,
    );
    frameDeceeleration.multiplyScalar(delta);
    frameDeceeleration.z =
      Math.sign(frameDeceeleration.z) *
      Math.min(Math.abs(frameDeceeleration.z), Math.abs(velocity.current.z));

    velocity.current.add(frameDeceeleration);

    const controller = character.current;
    const _Q = new Quaternion();
    const _A = new Vector3();
    const _R = controller.quaternion.clone();

    const acc = acceleration.current.clone();
    if (controls.run) {
      acc.multiplyScalar(2.0);
    }

    if (controls.forward) {
      velocity.current.z += acc.z * delta;
    }
    if (controls.backward) {
      velocity.current.z -= acc.z * delta;
    }
    if (controls.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.current.y);
      _R.multiply(_Q);
    }
    if (controls.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.current.y);
      _R.multiply(_Q);
    }

    controller.quaternion.copy(_R);

    const oldPosition = new Vector3();
    oldPosition.copy(controller.position);

    const forward = new Vector3(0, 0, 1);
    forward.applyQuaternion(controller.quaternion);
    forward.normalize();

    const sideways = new Vector3(1, 0, 0);
    sideways.applyQuaternion(controller.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.current.x * delta);
    forward.multiplyScalar(velocity.current.z * delta);

    controller.position.add(forward);
    controller.position.add(sideways);

    character.current.position.copy(controller.position);
  };

  useFrame((state, delta) => {
    prevAction.current = currAction.current;

    if (controls.jump) {
      currAction.current = animations.jump;
    } else if (controls.run) {
      currAction.current = animations.run;
    } else if (
      controls.forward ||
      controls.backward ||
      controls.left ||
      controls.right
    ) {
      currAction.current = animations.walk;
    } else {
      currAction.current = animations.idle;
    }

    if (prevAction.current !== currAction.current) {
      prevAction.current.fadeOut(0.2);

      if (prevAction.current === animations.walk) {
        const currDuration = currAction.current.getClip().duration;
        const prevDuration = prevAction.current.getClip().duration;
        const ratio = currDuration / prevDuration;
        currAction.current.time = prevAction.current.time * ratio;
      }
      currAction.current.reset().play();
    } else {
      currAction.current.play();
    }

    updateTransform(delta);
    updateCamera(state.camera, delta);

    mixer.update(delta);
  });

  return <primitive object={chObj} ref={character} />;
};

export default Character;
