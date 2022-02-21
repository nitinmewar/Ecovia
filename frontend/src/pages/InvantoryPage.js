import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const InvantoryPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [bags, setBags] = React.useState([]);

  const [size, setSize] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [flap_color, setFlap_color] = React.useState('');
  const [condition, setCondition] = React.useState('Damaged');
  const [store, setStore] = React.useState('');

  const email = userInfo.email;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const getBags = async () => {
      const bags = await axios.get(`/api/bags/${email}`);
      setBags(bags.data);
    };
    getBags();
  }, [history, userInfo, email]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!size || !weight || !flap_color || !store) {
      return alert('Please fill in all the fields');
    }
    const bag = {
      size,
      weight,
      flap_color,
      condition,
      store,
      ecovian: email,
    };

    axios.post('/api/bags', bag).then((response) => {
      const newBag = response.data;
      setBags((bags) => [...bags, newBag]);
    });

    window.location.reload();
  };

  const removeBag = async (id) => {
    if (window.confirm('Are you sure you want to delete this bag?')) {
      const response = await axios.delete(`/api/bags/${id}`);
      if (response.status === 200) {
        setBags((bags) => bags.filter((bag) => bag._id !== id));
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-center">Create New Bag</h2>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="color">
              <Form.Label>Coluor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter colour"
                value={flap_color}
                onChange={(e) => setFlap_color(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="store">
              <Form.Label>Store</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Store"
                value={store}
                onChange={(e) => setStore(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="condition">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Damaged">Damaged</option>
                <option value="Repair">Repair</option>
                <option value="Ready">Ready</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2 w-100">
              Create Bag
            </Button>
          </Form>
        </FormContainer>
      </Container>

      <h1 className="text-center mt-4 mb-3">Inventory</h1>
      <Container>
        {bags.length === 0 && (
          <Message variant="info">{`You don't have any bags yet.`}</Message>
        )}

        <Row>
          {bags.map((bag) => (
            <Col key={bag._id}>
              <Card className="m-3">
                <Card.Body>
                  <Card.Title className="text-center">{bag._id}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <Row>
                      <Col className="fs-4">Size</Col>
                      <Col>{bag.size}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="fs-4">Weight</Col>
                      <Col>{bag.weight}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="fs-4">Color</Col>
                      <Col>{bag.flap_color}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="fs-4">Store</Col>
                      <Col>{bag.store}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="fs-4">Condition</Col>

                      <Col>{bag.condition}</Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>

                <Card.Body>
                  <Button
                    className="btn btn-danger"
                    onClick={(e) => removeBag(bag._id)}
                  >
                    Remove
                  </Button>

                  <Link
                    className="btn btn-primary ms-3"
                    to={`/bags/${bag._id}`}
                  >
                    Actions
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default InvantoryPage;
