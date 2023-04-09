import { getDoc, doc, updateDoc } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Button, Form } from 'react-bootstrap';

import { db } from '../firebase';

export const UserAccount = () => {
  const [currentUser, setCurrentUser] = useState({});

  const [changingName, setChangingName] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingRole, setChangingRole] = useState(false);

  const [displayName, setDisplayName] = useState(currentUser.name);
  const [displayEmail, setDisplayEmail] = useState(currentUser.email);
  const [displayRole, setDisplayRole] = useState(currentUser.email);

  const currentUserId = useSelector(state => state.user.id);
  const isUserAdmin = currentUserId === '33wHXe68MldkHPBE41VatpaZhOB2';

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
    <div style={{ width: 350 }}>
      <h1>User's account</h1>
      <p>Here you can edit information about yourself</p>
      <Form onSubmit={e => handleNameChange(e)}>
        <Form.Group
          className="mb-3"
          controlId="formName"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Display name:{' '}
          {!changingName && (
            <>
              {currentUser.name}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setChangingName(!changingName);
                }}
              >
                Edit
              </Button>
            </>
          )}
          {changingName && (
            <>
              <Form.Control
                style={{
                  width: 150,
                  marginLeft: 0,
                  marginRight: 'auto',
                  fontSize: 16,
                  paddingLeft: 5,
                }}
                size="sm"
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.currentTarget.value)}
              />
              <Button size="sm" type="submit" variant="success">
                Accept
              </Button>
            </>
          )}
        </Form.Group>
      </Form>

      {isUserAdmin ? (
        ''
      ) : (
        <Form onSubmit={e => handleEmailChange(e)}>
          <Form.Group
            className="mb-3"
            controlId="formEmail"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            Your email:{' '}
            {!changingEmail && (
              <>
                {currentUser.email}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setChangingEmail(!changingEmail);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
            {changingEmail && (
              <>
                <Form.Control
                  type="text"
                  style={{
                    width: 150,
                    marginLeft: 0,
                    marginRight: 'auto',
                    fontSize: 16,
                    paddingLeft: 5,
                  }}
                  size="sm"
                  value={displayEmail}
                  onChange={e => setDisplayEmail(e.currentTarget.value)}
                />
                <Button size="sm" type="submit" variant="success">
                  Accept
                </Button>
              </>
            )}
          </Form.Group>
        </Form>
      )}

      {isUserAdmin ? (
        ''
      ) : (
        <Form onSubmit={e => handleRoleChange(e)}>
          <Form.Group
            className="mb-3"
            controlId="formRole"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            Your role:{' '}
            {!changingRole && (
              <>
                {currentUser.role}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setChangingRole(!changingRole);
                  }}
                >
                  Edit
                </Button>
              </>
            )}
            {changingRole && (
              <>
                <Form.Select
                  id="dropdown-basic-button"
                  value={displayRole}
                  variant="secondary"
                  style={{
                    width: 160,
                    marginLeft: 5,
                    marginRight: 'auto',
                    fontSize: 16,
                    paddingLeft: 5,
                  }}
                  size="sm"
                  onChange={e => setDisplayRole(e.currentTarget.value)}
                >
                  <option value="driver">driver</option>
                  <option value="passenger">passenger</option>
                  <option value="manager">manager</option>
                </Form.Select>
                <Button size="sm" type="submit" variant="success">
                  Accept
                </Button>
              </>
            )}
          </Form.Group>
        </Form>
      )}
    </div>
  );
};
