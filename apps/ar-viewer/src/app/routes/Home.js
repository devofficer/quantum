/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { memo, Suspense, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="home-wrapper vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <Col>
          <img width={'80%'} src="/logo.webp" alt="UAR Logo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="my-4">Locate a Quasar</h2>
          <Button variant="info" onClick={() => navigate('catcher')}>
            Begin the Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
