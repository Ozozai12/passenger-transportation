import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { db } from '../firebase';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const isAdmin = useSelector(state => state.user.email);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const array = [];
    querySnapshot.forEach(doc => {
      const user = doc.data();
      user.id = doc.id;
      array.push(user);
    });
    setUsers(array);
  };

  const roleUpdater = async (userId, newRole) => {
    const roleRef = doc(db, 'users', userId);

    await updateDoc(roleRef, {
      role: newRole,
    });
  };

  return (
    <>
      <h1>Editing users</h1>
      <div>
        <p>Existed users:</p>
        <Row xs={1} md={3} className="g-4">
          {users.map(user => {
            return (
              <Col key={user.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>Name: {user.name}</Card.Title>
                    <p>Email: {user.email}</p>
                    {user.email === isAdmin ? (
                      <span>Role: {user.role}</span>
                    ) : (
                      <>
                        <label>
                          Role:
                          <select
                            id="role"
                            defaultValue={user.role}
                            style={{ marginLeft: 5 }}
                            onChange={e => {
                              roleUpdater(user.id, e.currentTarget.value);
                            }}
                          >
                            <option value="driver">Driver</option>
                            <option value="passenger">Passenger</option>
                            <option value="manager">Manager</option>
                          </select>
                        </label>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};
