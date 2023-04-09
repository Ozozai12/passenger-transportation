import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { db } from '../firebase';

import { TripCreator } from './TripCreator';

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTrips();
  }, []);

  const handleClose = () => {
    setShow(false);
    getTrips();
  };
  const handleShow = () => setShow(true);

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, 'trips'));
    const array = [];
    querySnapshot.forEach(doc => {
      const trip = doc.data();
      trip.id = doc.id;
      array.unshift(trip);
    });
    setTrips(array);
  };

  return (
    <>
      <h1>Dashboard page</h1>
      <Button style={{ marginTop: 20 }} variant="primary" onClick={handleShow}>
        Create a trip
      </Button>
      <TripCreator onOpen={show} onClose={handleClose} />

      <div style={{ marginTop: 30 }}>
        <h2>Aviable trips:</h2>
        <br />
        <Row xs={1} md={3} className="g-4">
          {trips.map(trip => (
            <Col key={trip.id}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {trip.startsFrom} - {trip.destination}
                  </Card.Title>
                  <Card.Text>
                    Trip creator: {trip.owner}
                    <br />
                    Trip starts at: {trip.startsAt}
                    <br />
                    Number of passengers: {trip.passangersNumber}
                    <br />
                    Car number: {trip.carNumber}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
