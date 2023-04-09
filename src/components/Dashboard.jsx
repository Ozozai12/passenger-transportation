import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { db } from '../firebase';

import { TripCreator } from './TripCreator';

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, 'trips'));
    const array = [];
    querySnapshot.forEach(doc => {
      const trip = doc.data();
      trip.id = doc.id;
      array.push(trip);
    });
    setTrips(array);
  };

  return (
    <>
      <h1>Dashboard page</h1>
      <TripCreator />
      <div>
        <p>Aviable trips:</p>
        <ul>
          {trips.map(trip => {
            return (
              <li key={trip.id}>
                <p>Who created: {trip.owner}</p>
                <p>Car number: {trip.carNumber}</p>
                <p>Trip starts at: {trip.startsAt}</p>
                <p>Starts from: {trip.startsFrom}</p>
                <p>Destination point: {trip.destination}</p>
                <p>Number of passengers: {trip.passangersNumber}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
