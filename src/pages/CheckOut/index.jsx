import React from "react";
import "./CheckOut.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSelection";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totoQty = useSelector((state) => state.cart.totalQuantity);
  const totoAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing_form">
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="number" placeholder="Phone number" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Street address" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Postal code" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="check_cart">
                <h6>
                  Total Qty: <span>{totoQty}</span>
                </h6>
                <h6>
                  Subtotal:<span>${totoAmount}</span>
                </h6>
                <h6>
                  Shipping:<span>$0</span>
                </h6>

                <h3>
                  Total Cost: <span>${totoAmount}</span>
                </h3>
              </div>

              <button className="buy_btn auth_btn w-100">Place an order</button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
