import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetDataFireBase from "../custom-hook/useGetDataFireBase";

const Dashboard = () => {
  const { data: products } = useGetDataFireBase("products");
  const { data: users } = useGetDataFireBase("users");

  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue_box">
              <h5>Total Sales</h5>
              <span>$123</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="order_box">
              <h5>Orders</h5>
              <span>$123</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="product_box">
              <h5>Total Products</h5>
              <span>${users.products || 0} </span>
            </div>
          </Col>
          <Col lg="3">
            <div className="user_box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
