import { children } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faChildren } from "@fortawesome/free-solid-svg-icons";

export default function BaseApp({PageTitle,children}){

  const navigate = useNavigate();

  return(
    <div className="MainParentCont">
      <div className="TitleCont">
        <h3>ICY Edtech pvt ltd</h3>
        <h3>Chennai-28</h3>
      </div>

      <div className="NavigationCont">
        <div className="Navigation">
          <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand className="PageTitle" href="#">{PageTitle}</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                    ICY Mentor-Student Management Portal
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/Dashboard">Home</Nav.Link>
                    <NavDropdown
                      title="Mentors"
                      id={`offcanvasNavbarDropdown-expand-${false}`}
                    >
                      <NavDropdown.Item href="/mentors"><FontAwesomeIcon icon={faChalkboardUser} />{" "}Mentor Data</NavDropdown.Item>
                      <NavDropdown.Item href="/CreateMentor">
                      <FontAwesomeIcon icon={faCirclePlus} style={{color: "#4c1fd1",}} />{" "}Create Mentor
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Students"
                      id={`offcanvasNavbarDropdown-expand-${false}`}
                    >
                      <NavDropdown.Item href="/students"><FontAwesomeIcon icon={faChildren} />{" "}Student Data</NavDropdown.Item>
                      <NavDropdown.Item href="/CreateStudent">
                      <FontAwesomeIcon icon={faCirclePlus} style={{color: "#4c1fd1",}} />{" "}Create Student
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Button onClick={()=>navigate("/")} variant="danger"><FontAwesomeIcon icon={faPowerOff} size="lg" style={{color: "#050505",}} />{" "}Logout</Button>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      </div>

      <div className="ContentCont">
        {children}
      </div>

      <div className="FooterCont">
        <div className="Foot1">
          <p><b>Address :</b></p>
          <p>ICY Edtech pvt ltd </p>
          <p>Anna Nagar,Chennai-28</p>
        </div>
        <div className="Foot2">
          All Rights Reserved@2024
        </div>
        <div className="Foot3">
          <p><b>Contact us</b></p>
          <p>Email : <a href="mailto:icyedtech@gmail.com"></a>icyedtech@gmail.com</p>
          <p>Phone : <a href="tel:044-244325">044-244325</a></p>
          <p>Fax : <a href="#">044-2443251</a></p>
        </div>
      </div>
    </div>
  );
}