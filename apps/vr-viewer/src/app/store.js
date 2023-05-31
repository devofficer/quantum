import { SCENES } from 'constants/enums';
import create from 'zustand';

const useQuasarStore = create((set) => ({
  activeScene: SCENES.universe,
  setActiveScene: (scene) => set({ activeScene: scene }),
}));

export default useQuasarStore;
