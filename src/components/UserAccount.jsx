import { getDoc, doc, updateDoc } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { db } from '../firebase';
import { setUser } from 'redux/userSlice';

export const UserAccount = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState('User');
  const [changingName, setChangingName] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingSex, setChangingSex] = useState(false);
  const [changingRole, setChangingRole] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser.name);
  const [displayEmail, setDisplayEmail] = useState(currentUser.email);
  const [displaySex, setDisplaySex] = useState(currentUser.email);
  const [displayRole, setDisplayRole] = useState(currentUser.email);

  const currentUserId = useSelector(state => state.user.id);

  useEffect(() => {
    getUserById(currentUserId);
  }, [currentUserId]);

  const getUserById = async id => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();
    setCurrentUser(user);
    setDisplayName(user.name);
    setDisplayEmail(user.email);
    setDisplaySex(user.sex);
    setDisplayRole(user.role);
  };

  const handleNameChange = async e => {
    e.preventDefault();
    const docRef = doc(db, 'users', currentUserId);

    await updateDoc(docRef, {
      name: displayName,
    });
    currentUser.name = displayName;
    setChangingName(false);
  };

  const handleEmailChange = async e => {
    e.preventDefault();
    const docRef = doc(db, 'users', currentUserId);

    await updateDoc(docRef, {
      email: displayEmail,
    });
    currentUser.email = displayEmail;
    setChangingEmail(false);
  };

  const handleRoleChange = async e => {
    e.preventDefault();
    const docRef = doc(db, 'users', currentUserId);

    await updateDoc(docRef, {
      role: displayRole,
    });
    currentUser.role = displayRole;
    setChangingRole(false);
  };

  return (
    <>
      <h1>User's account</h1>
      <p>Here you can edit information about yourself</p>
      <form onSubmit={e => handleNameChange(e)}>
        <label>
          Display name:
          {changingName && (
            <>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.currentTarget.value)}
              />
              <button type="submit">Accept</button>
            </>
          )}
          {!changingName && (
            <>
              <span> {currentUser.name} </span>
              <button
                onClick={() => {
                  setChangingName(!changingName);
                }}
              >
                Edit
              </button>
            </>
          )}
        </label>
      </form>
      <form onSubmit={e => handleEmailChange(e)}>
        <label>
          Your email:
          {changingEmail && (
            <>
              <input
                type="text"
                value={displayEmail}
                onChange={e => setDisplayEmail(e.currentTarget.value)}
              />
              <button type="submit">Accept</button>
            </>
          )}
          {!changingEmail && (
            <>
              <span> {currentUser.email} </span>
              <button
                onClick={() => {
                  setChangingEmail(!changingEmail);
                }}
              >
                Edit
              </button>
            </>
          )}
        </label>
      </form>
      <form onSubmit={e => handleRoleChange(e)}>
        <label>
          Your role:
          {changingRole && (
            <>
              <select
                id="role"
                value={displayRole}
                onChange={e => {
                  setDisplayRole(e.currentTarget.value);
                }}
              >
                <option value="not specified">not specified</option>
                <option value="driver">driver</option>
                <option value="passenger">passenger</option>
                <option value="manager">manager</option>
              </select>
              <button type="submit">Accept</button>
            </>
          )}
        </label>
      </form>

      {!changingRole && (
        <>
          <span> {currentUser.role} </span>
          <button
            onClick={() => {
              setChangingRole(!changingRole);
            }}
          >
            Edit
          </button>
        </>
      )}
    </>
  );
};
