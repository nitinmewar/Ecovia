import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="text-center p-3">
      <Container >
        Copyright &copy; {new Date().getFullYear()}
      </Container>
    </div>
  );
};

export default Footer;
