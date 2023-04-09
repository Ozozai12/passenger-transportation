import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { removeUser } from 'redux/userSlice';

export const Header = () => {
  const user = useSelector(state => state.user.name);
  const admin = useSelector(
    state => state.user.email === 'dante120591@gmail.com'
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <header>
      <Navbar bg="light" expand="xxxl" className="mb-3">
        <Container
          fluid
          style={{
            width: 1100,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <Navbar.Toggle />
          <Navbar.Brand href="/passenger-transportation">
            Passenger Transportation
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Passenger Transporter
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {!user && (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="register">Register</Nav.Link>
                  <Nav.Link href="login">Login</Nav.Link>
                </Nav>
              )}
              {user && (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/passenger-transportation">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="/passenger-transportation/user">
                    My Account
                  </Nav.Link>
                  {admin && (
                    <Nav.Link href="/passenger-transportation/admin">
                      Editing users
                    </Nav.Link>
                  )}
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {user ? (
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          ) : (
            ''
          )}
        </Container>
      </Navbar>
    </header>
  );
};
