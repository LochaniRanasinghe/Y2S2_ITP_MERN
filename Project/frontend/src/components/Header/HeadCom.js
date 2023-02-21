import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HeadCom = () => {
  const location = useLocation(); // React Hook
  //console.log(location.pathname); // returns relative path, without domain name
  const history = useNavigate();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">WIRELESS WAVES</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* Navigation bar items................................................................... */}
            <NavDropdown title="CUSTOMER" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/maincustomerdetails">
                Customer Details
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="/maincustomerbill">
                Customer Bills
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>

            {/* OFFERS................................................................................... */}

            <NavDropdown title="OFFERS" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/mainpromotionpage"}>Publish Offers</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item>
                <Link to={"/mainpromreport"}> Promotion Summary</Link>
              </NavDropdown.Item>
            </NavDropdown>

            {/* SERVICES................................................................................... */}

            <NavDropdown title="SERVICES" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/MainClaimPage"}>WARRANTY CLAIMS</Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to={"/ClaimHome/MainSerStatic"}>Static VIEW</Link>
              </NavDropdown.Item>
            </NavDropdown>

            {/* INVENTORY................................................................................... */}

            <NavDropdown title="INVENTORY" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/itemdetails"}>Items</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/productdetails"}>Products</Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
              Something else here
              </NavDropdown.Item> */}
            </NavDropdown>

            {/* SUPPLIER................................................................................... */}

            <NavDropdown title="SUPPLIER" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/supplierdetails"}>Supplier Details Management</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/invoicedetails"}>Invoice Details Management</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

            {/* FINANCIAL................................................................................... */}

            <NavDropdown title="FINANCIAL" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/otherincome"}>Other Incomes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/otherexpen"}> Other expends</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to={"/financestat"}>Statics</Link>
              </NavDropdown.Item>
            </NavDropdown>

            {/* EMPLOYEE................................................................................... */}

            <NavDropdown title="EMPLOYEE" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/employeemain"}>Employee Details </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/leavesmain"}>Leave Details </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/salarymain"}>Salary Details </Link>
              </NavDropdown.Item>
            </NavDropdown>

            {/* BRANCH................................................................................... */}

            <NavDropdown title="BRANCH" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to={"/branchdetails"}>Branch Details</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={"/admindetails"}>Admin Details</Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>

          {/* search bar................................................................................. */}
          <Form className="d-flex">
            <Button
              onClick={() => {
                localStorage.removeItem("userInfo");
                history("/");
              }}
              variant="outline-danger"
            >
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeadCom;
