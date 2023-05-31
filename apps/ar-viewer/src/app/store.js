import create from 'zustand';

const query = new URLSearchParams(window.location.search);
const npointId = query.get('projectId') || '762b08b394182b77740f'; // points to the npoint document
const quasarId = query.get('quasarId') || 1;

const useStore = create((set) => ({
  isDesktopMode:
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ),
  npointId: npointId, // points to the npoint document
  isCaught: null,
  activeQuasar: null,
  projectData: null,
  selectedQuasar: quasarId - 1, // converting from 1-indexed to 0-indexed for usability
  currentLevel: 0,
  itemDetails: null,
  setItemDetails: (itemDetails) => set({ itemDetails }),
  setProjectData: (project, selectedQuasar) =>
    set({
      projectData: project,
      activeQuasar: project.quasars[selectedQuasar],
      itemDetails: null,
      isCaught: true,
      currentLevel: 0,
    }),
  catchQuasar: () => set((state) => ({ isCaught: true })),
  releaseQuasar: () => set((state) => ({ isCaught: false })),
  // setLevaControls: (controls) => set((state) => ({ levaControls: controls })),
  setCurrentLevel: (currentLevel) =>
    set((state) => ({ currentLevel: Number(currentLevel) })),
  setSelectedQuasar: (selectedQuasar) =>
    set((state) => ({
      selectedQuasar: Number(selectedQuasar),
    })),
  setIsDesktopMode: (isDesktopMode) => set({ isDesktopMode }),
  setNpointId: (npointId) => set({ npointId }),
}));

export default useStore;
