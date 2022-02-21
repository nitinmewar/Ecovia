import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const BagDetails = ({ history, match }) => {
  const id = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [bag, setBag] = React.useState({});

  const [condition, setCondition] = React.useState(bag.condition);
  const [ecovians, setEcoVians] = React.useState([]);
  const [user, setUser] = React.useState(bag.ecovian);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const ecovians = async () => {
      const response = await axios.get(`/api/users/`);
      setEcoVians(response.data);
    };
  
    
    const getBag = async () => {
      const bag = await axios.get(
        `http://localhost:5000/api/bags/details/${id}`
      );
      setBag(bag.data);
    };
    ecovians();
    getBag();
  }, [history, userInfo, id,ecovians]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      ...bag,
      condition: condition,
      ecovian: user,
    };

    const updatedBage = await axios.put(
      `http://localhost:5000/api/bags/update/${id}`,
      data
    );
    setBag(updatedBage.data);

    history.push('/inventory');
  };

  return (
    <div>
      <Container>
        <h1 className="text-center">Bag Actions</h1>

        <Row>
          <Col md={6}>
            <h3>Bag Details</h3>
            <p>
              <strong>Size:</strong> {bag.size}
            </p>
            <p>
              <strong>Weight:</strong> {bag.weight}
            </p>
            <p>
              <strong>Flap Color:</strong> {bag.flap_color}
            </p>
            <p>
              <strong>Condition:</strong> {bag.condition}
            </p>
            <p>
              <strong>Store:</strong> {bag.store}
            </p>
            <p>
              <strong>Ecovian:</strong> {bag.ecovian}
            </p>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <Form onSubmit={submitHandler}>
                <ListGroupItem>
                  <Row>
                    <Col>Condition</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                      >
                        <option>Select One</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Repair">Repair</option>
                        <option value="Ready">Ready</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Give ownership</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      >
                        <option>Select One</option>
                        {ecovians.map((ecovian) => (
                          <option key={ecovian._id} value={ecovian.email}>
                            {ecovian.email}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Button
                      type="submit"
                      variant="primary"
                      className="my-2 w-100"
                    >
                      Update
                    </Button>
                  </Row>
                </ListGroupItem>
              </Form>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BagDetails;
