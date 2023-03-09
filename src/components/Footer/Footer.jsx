import React from "react";
import "./Footer.css";
import logo from "../../assets/images/eco-logo.png";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4">
            <div className="logo d-flex justify-content-start ">
              <h1>WaveD</h1>
            </div>
            <div>
              <p className="footer_text mt-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum quae veritatis adipisci nemo aliquam repellat
                temporibus, error tenetur? Ipsa, distinctio!
              </p>
            </div>
          </Col>

          <Col lg="3" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Top Categories</h4>
              <ListGroup className="footer_box">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="2" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Useful Links</h4>
              <ListGroup className="footer_box">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" className="mb-4">
            <div className="footer_quick-links">
              <h4 className="quick_links-title">Contact</h4>
              <ListGroup className="footer_box">
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i class="ri-map-pin-2-line"></i>
                    <p className="footer_box-des">
                      Khu chợ mới Thị Trấn - Đô Lương
                    </p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i class="ri-phone-line"></i>
                    <p className="footer_box-des">09882335**</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i class="ri-mail-line"></i>
                    <p className="footer_box-des">tungdev64@gmail.com</p>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12" className="mb-4">
            <div className="copy_right">
              <p>
                Copyright by <span className="text-bg-danger">@WaveD</span>{" "}
                {year}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
