import { useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { db } from '../firebase';

export const TripCreator = ({ onOpen, onClose }) => {
  const [carNumber, setCarNumber] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [startsFrom, setStartsFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [passangersNumber, setPassangersNumber] = useState('');
  const owner = useSelector(state => state.user.name);

  const addTrip = async (
    carNumber,
    startsAt,
    startsFrom,
    destination,
    passangersNumber,
    event
  ) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'trips'), {
        owner,
        carNumber,
        destination,
        startsAt,
        startsFrom,
        passangersNumber,
      });
      setCarNumber('');
      setStartsAt('');
      setStartsFrom('');
      setDestination('');
      setPassangersNumber('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Modal show={onOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a trip</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={event =>
          addTrip(
            carNumber,
            startsAt,
            startsFrom,
            destination,
            passangersNumber,
            event
          )
        }
      >
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formCarNumber">
            <Form.Label>Car number</Form.Label>
            <Form.Control
              type="text"
              placeholder="AA1234OO"
              value={carNumber}
              required
              onChange={e => setCarNumber(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStartsAt">
            <Form.Label>Starts at:</Form.Label>
            <Form.Control
              type="date"
              value={startsAt}
              required
              onChange={e => setStartsAt(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStartsFrom">
            <Form.Label>Starts from:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kyiv"
              value={startsFrom}
              required
              onChange={e => setStartsFrom(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDestination">
            <Form.Label>Destination point</Form.Label>
            <Form.Control
              type="text"
              placeholder="Odesa"
              value={destination}
              required
              onChange={e => setDestination(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDestination">
            <Form.Label>Number of passengers:</Form.Label>
            <Form.Control
              type="number"
              value={passangersNumber}
              required
              onChange={e => setPassangersNumber(e.currentTarget.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onClose}>
            Add trip
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
