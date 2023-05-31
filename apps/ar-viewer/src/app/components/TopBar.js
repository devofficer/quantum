import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Card,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  NavLink,
} from 'react-bootstrap';

import useStore from '../store';
import { FaGlobe } from 'react-icons/fa';
import { useRef, useState } from 'react';

const OffcanvasExample = () => {
  const setSelectedQuasar = useStore((state) => state.setSelectedQuasar);
  const activeQuasar = useStore((state) => state.activeQuasar);
  const projectData = useStore((state) => state.projectData);
  const setNpointId = useStore((state) => state.setNpointId);
  const npointId = useStore((state) => state.npointId);
  const [projectCode, setProjectCode] = useState('1');
  const offCanvasRef = useRef();

  const closeOffCanvas = () => offCanvasRef?.current?.backdrop?.click();

  const expand = false; // breakpoint to expand the offcanvas

  return (
    <div className="top-bar ">
      <Navbar
        key={expand}
        variant="dark"
        bg="black"
        expand={expand}
        className="px-2"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src="../assets/logo.webp"
              alt="logo"
              width="160"
              className="d-inline-block align-top "
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            ref={offCanvasRef}
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="bg-light text-dark"
          >
            <Offcanvas.Header
              closeButton
              style={{
                backgroundColor: '#111',
                color: 'white',
              }}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {projectData?.projectName || 'Control Center'}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column ">
              <Row>
                <Col>
                  <h2 className="h6 text-white mb-0">Nearby Quasars</h2>
                  <hr className="border-white" />
                </Col>
              </Row>

              <Row>
                {projectData?.quasars?.map((quasar, index) => (
                  <Col xs={4} className="mb-3" key={`mini-${index}`}>
                    <Card
                      style={{
                        opacity: activeQuasar?.id === quasar.id ? 1 : 0.4,
                        border:
                          activeQuasar?.id === quasar.id
                            ? '2px solid #5a5a5a'
                            : 'none',
                      }}
                    >
                      <Card.Img
                        className={
                          activeQuasar?.id === quasar.id
                            ? 'bg-dark'
                            : 'bg-black'
                        }
                        onClick={() => {
                          setSelectedQuasar(index);
                          closeOffCanvas();
                        }}
                        src={quasar.imageSrc}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col>
                  <h2 className="h6 text-white">Project loader</h2>
                  <hr className="border-white" />
                  <p className="text-white mb-2 small">
                    If you know the secret code to another Quasars sighting then
                    enter it below:
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Project ID"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setProjectCode(e.target.value)}
                      className="bg-black text-white border-dark"
                    />
                    <Button
                      className="load-button"
                      variant="primary"
                      onClick={() => {
                        closeOffCanvas();
                        setNpointId(projectCode);
                      }}
                    >
                      Load
                    </Button>
                  </InputGroup>
                </Col>
              </Row>

              {/* <Row>
                <Col>
                  <p className="text-white mb-2 small">
                    Or check out one of these galleries:
                  </p>
                  {npointId !== '830360b5f6a82edd4912' ? ( // A quick hack .. running out of time for demo :)
                    <p>
                      <a
                        href={`https://quasars.app?projectId=830360b5f6a82edd4912&quasarId=1`}
                      >
                        Quantum Art
                      </a>
                    </p>
                  ) : null}
                  {npointId !== '9c2bfdfd376f473d072c' ? (
                    <p>
                      <a
                        href={`https://quasars.app?projectId=9c2bfdfd376f473d072c&quasarId=1`}
                      >
                        Curio Cards Full Set
                      </a>
                    </p>
                  ) : null}
                  {npointId !== '4d7719691b367df71b54' ? (
                    <p>
                      <a
                        href={`https://quasars.app?projectId=4d7719691b367df71b54&quasarId=1`}
                      >
                        Alexx Shadow's Cyber Brokers
                      </a>
                    </p>
                  ) : null}
                </Col>
              </Row> */}

              <Row>
                <Col>
                  <p className="text-white mb-2 small">
                    Or check out one of these galleries:
                  </p>
                  {npointId !== '830360b5f6a82edd4912' ? ( // A quick hack .. running out of time for demo :)
                    <p>
                      <NavLink
                        className="text-decoration-underline"
                        onClick={() => {
                          closeOffCanvas();
                          setNpointId('830360b5f6a82edd4912');
                        }}
                      >
                        Quantum Art
                      </NavLink>
                    </p>
                  ) : null}
                  {npointId !== '9c2bfdfd376f473d072c' ? (
                    <p>
                      <NavLink
                        className="text-decoration-underline"
                        onClick={() => {
                          closeOffCanvas();
                          setNpointId('9c2bfdfd376f473d072c');
                        }}
                      >
                        Curio Cards Full Set
                      </NavLink>
                    </p>
                  ) : null}
                  {npointId !== '4d7719691b367df71b54' ? (
                    <p>
                      <NavLink
                        className="text-decoration-underline"
                        onClick={() => {
                          closeOffCanvas();
                          setNpointId('4d7719691b367df71b54');
                        }}
                      >
                        Alexx Shadow's Cyber Brokers
                      </NavLink>
                    </p>
                  ) : null}
                </Col>
              </Row>

              <Nav className="justify-content-end flex-grow-1 pe-3 ">
                <h2 className="h6 text-white mb-0">Vital Resources</h2>
                <hr className="border-white" />
                <Nav.Link
                  className="text-white"
                  target="_blank"
                  // href={`https://twitter.com/${projectData?.socials?.twitter}`}
                  href={`https://twitter.com/quasarsofficial`}
                >
                  <img
                    alt="twitter"
                    src="../assets/twitter.png"
                    width="25px"
                    className="me-2"
                  />
                  {/* Follow Us @{projectData?.socials?.twitter} */}
                  Follow Us @QuasarsOfficial
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  target="_blank"
                  // href={projectData?.website}
                  href={'http://quasarsofficial.com'}
                >
                  <FaGlobe size={'1.5rem'} className="me-2" color="#fff" />
                  {/* Visit {projectData?.projectName} */}
                  Visit QuasarsOfficial.com
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default OffcanvasExample;
