import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import CommonSection from "../../components/UI/CommonSelection";
import Helmet from "../../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { cartActions } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import "./Cart.css";

const Cart = () => {
  const cartItem = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItem.length === 0 ? (
                <h1 className="">No product</h1>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <motion.th whileTap={{ scale: 1.1 }}> Delete</motion.th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem?.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div className="">
                <h6 className="d-flex align-items-center justify-content-between ">
                  Subtotal
                </h6>
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy_btn w-100">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
                <button className="buy_btn w-100 mt-2">
                  <Link to="/checkout">Checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.image} alt="sản phẩm" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <motion.td whileTap={{ scale: 1.1 }}>
        <i className="ri-delete-bin-line" onClick={deleteProduct}></i>
      </motion.td>
    </tr>
  );
};
export default Cart;
