import { Button, Dropdown } from 'react-bootstrap';
import useStore from '../../store';

const QuasarController = ({ XR8 }) => {
  const isCaught = useStore((state) => state.isCaught);
  const releaseQuasar = useStore((state) => state.releaseQuasar);
  const isDesktopMode = useStore((state) => state.isDesktopMode);
  const currentLevel = useStore((state) => state.currentLevel);
  const setCurrentLevel = useStore((state) => state.setCurrentLevel);
  const activeQuasar = useStore((state) => state.activeQuasar);

  const recenter = () => {
    if (isDesktopMode) return;
    const { XR8 } = window;
    XR8.XrController.recenter();
  };

  const handleRelease = () => {
    recenter();
    releaseQuasar();
  };

  return !isCaught ? (
    <div className="d-flex justify-content-center align-items-center action-bar">
      {!isCaught && <p className="mb-0 h6">Catch the Quasar!</p>}
    </div>
  ) : (
    <div className="d-flex justify-content-between align-items-center action-bar">
      <Button
        onClick={() => recenter()}
        className="mx-1"
        variant="outline-light"
        size="sm"
      >
        Fix Positioning
      </Button>

      <div className="d-flex align-items-center justify-content-center">
        {isCaught && activeQuasar.gallery.length > 1 && (
          <Dropdown onSelect={(eventKey) => setCurrentLevel(eventKey)}>
            <Dropdown.Toggle
              variant="outline-light"
              id="dropdown-basic"
              size="sm"
            >
              Layer {currentLevel + 1}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {activeQuasar.gallery.reverse().map((layer, index) => (
                <Dropdown.Item
                  key={`layer-${activeQuasar.gallery.length - 1 - index}`}
                  eventKey={activeQuasar.gallery.length - 1 - index}
                  active={
                    currentLevel === activeQuasar.gallery.length - 1 - index
                  }
                >
                  Layer {activeQuasar.gallery.length - index}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {isCaught && (
        <Button
          onClick={() => handleRelease()}
          className="mx-1"
          variant="primary"
          size="sm"
        >
          Release Quasar
        </Button>
      )}
    </div>
  );
};

export default QuasarController;
