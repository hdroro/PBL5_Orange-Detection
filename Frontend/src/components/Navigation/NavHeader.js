import "./NavHeader.scss";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CameraIcon } from "../Icon/Icon";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";

function NavHeader() {
  const location = useLocation();
  const history = useHistory();
  const [isHomePage, setIsHomePage] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    history.push("/");
  };

  return (
    <>
      <div className="nav-header">
        <Navbar
          expand="lg"
          className={`${isHomePage ? "bg-header" : "bg-header-light"}`}
        >
          <Container>
            <Navbar.Brand to="/">
              <CameraIcon />
              <div
                className={`ms-2 ${
                  isHomePage ? "brand-name" : "brand-name-dark"
                }`}
              >
                Orandetection
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  to="/"
                  exact
                  className={`${isHomePage ? "nav-link" : "nav-link dark"}`}
                >
                  Home
                </NavLink>
              </Nav>

              <Nav>
                {!isHomePage ? (
                  <>
                    <NavLink className="nav-link dark" to="/detection">
                      Nhận dạng
                    </NavLink>
                    <NavLink className="nav-link dark" to="/statistics">
                      Thống kê
                    </NavLink>
                    <NavDropdown
                      title="Admin"
                      id="basic-nav-dropdown"
                      className="dropdown-dark"
                    >
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <></>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default NavHeader;
