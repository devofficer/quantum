export const CONTROLS = {
  forward: 'forward',
  backward: 'backward',
  left: 'left',
  right: 'right',
  jump: 'jump',
  run: 'run',
};

export const KEYBOARD_MAP = [
  { name: CONTROLS.forward, keys: ['ArrowUp', 'w', 'W'] },
  { name: CONTROLS.backward, keys: ['ArrowDown', 's', 'S'] },
  { name: CONTROLS.left, keys: ['ArrowLeft', 'a', 'A'] },
  { name: CONTROLS.right, keys: ['ArrowRight', 'd', 'D'] },
  { name: CONTROLS.run, keys: ['Shift'] },
  { name: CONTROLS.jump, keys: ['Space'] },
];

export const SCENES = {
  universe: 'universe',
  museum: 'museum',
};
