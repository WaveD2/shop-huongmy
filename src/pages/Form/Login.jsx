import React, { useState } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const roleCheckAdmin = "admin_shop37@gmail.com";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const providerGG = new GoogleAuthProvider();
  const providerFB = new FacebookAuthProvider();
  const authForm = getAuth();

  const handleLoginGG = async () => {
    await signInWithPopup(authForm, providerGG)
      .then((result) => {
        const user = result.user;
        if (user) navigate("/");
        else {
          alert("Đăng nhập Facebook thất bại");
        }
      })
      .catch((error) => {
        console.log("lỗi connect firebase", error);
      });
  };
  const handleLoginFB = async () => {
    await signInWithPopup(authForm, providerFB)
      .then((result) => {
        const user = result.user;
        if (user) navigate("/");
        else {
          alert("Đăng nhập Google thất bại");
        }
      })
      .catch((error) => {
        toast.error("Sai thông tin đăng nhập");
        console.log("lỗi connect firebase", error);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      toast.success("Đăng nhập thành công");
      userCredential.user.email.toString() === roleCheckAdmin
        ? navigate("/dashboard")
        : navigate("/home");
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
          <Button
            color="primary"
            outline
            style={{ display: "block", margin: "12px auto", minWidth: "400px" }}
            onClick={handleLoginGG}>
            Đăng nhập Google
          </Button>
          <Button
            color="primary"
            outline
            style={{ display: "block", margin: "12px auto", minWidth: "400px" }}
            onClick={handleLoginFB}>
            Đăng nhập Facebook
          </Button>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
