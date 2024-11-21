import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const NavBar: React.FunctionComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={require("../../assets/LOGO.png")}
            alt="Capgemini"
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" role="navigation">
          <Nav className="ms-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/">Overview</Nav.Link>
            <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#/admin">Administration</Nav.Link>
            <Nav.Link href="#">
              <img
                src={require("../../assets/Search.png")}
                alt=""
                height="18"
              />
            </Nav.Link>
            <Nav.Link href="#">Raise A Ticket</Nav.Link>
            <Nav.Link href="#">
              <img
                src={require("../../assets/cart_normal.png")}
                alt=""
                height="18"
              />
            </Nav.Link>
            <Nav.Link href="#">
              <img
                src={require("../../assets/Noti_Normal.png")}
                alt=""
                height="18"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
