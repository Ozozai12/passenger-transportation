import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const admin = useSelector(state => state.user.email);

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
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                {user.email === admin ? (
                  <p>Role: {user.role}</p>
                ) : (
                  <>
                    <label>
                      Role:
                      <select
                        id="role"
                        defaultValue={user.role}
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
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
