import React, { useState } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      toast.success("Đăng nhập thành công");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error("Sai thông tin đăng nhập");
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col>
                <h4 className="text-center fw-bold">Loading....</h4>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold d-block mb-3 ">Đăng nhập</h3>

                <Form className="auth_form" onSubmit={signIn}>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="buy_btn auth_btn ">
                    Đăng nhập
                  </motion.button>
                  <p>
                    Bạn chưa có tài khoản ?{" "}
                    <Link to="/signup">Tạo tài khoản miễn phí</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
