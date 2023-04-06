import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  const [carNumber, setCarNumber] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [startsFrom, setStartsFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [passangersNumber, setPassangersNumber] = useState('');
  const owner = useSelector(state => state.user.name);
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
    <>
      <h1>Dashboard page</h1>
      <form
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
        <label>
          Car number
          <input
            type="text"
            value={carNumber}
            required
            onChange={e => setCarNumber(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Starts at:
          <input
            type="text"
            value={startsAt}
            required
            onChange={e => setStartsAt(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Starts from:
          <input
            type="text"
            value={startsFrom}
            required
            onChange={e => setStartsFrom(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Destination point:
          <input
            type="text"
            value={destination}
            required
            onChange={e => setDestination(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Number of passengers:
          <input
            type="text"
            value={passangersNumber}
            required
            onChange={e => setPassangersNumber(e.currentTarget.value)}
          />
        </label>
        <br />
        <button type="submit">Add trip</button>
      </form>
      <div>
        <p>Aviable trips:</p>
        <ul>
          {trips.map(trip => {
            return (
              <li key={trip.id}>
                <p>Who created: {trip.owner}</p>
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
