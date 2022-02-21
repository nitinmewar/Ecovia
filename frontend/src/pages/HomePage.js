import React from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'
const HomePage = () => {
  return (
    <Container>
      <h2 className="text-center">
        Welcome to Ecovia
      </h2>
      <h3>
        <Link to="/inventory">Visit your Inventory</Link>
      </h3>
    </Container>
  );
};

export default HomePage;
