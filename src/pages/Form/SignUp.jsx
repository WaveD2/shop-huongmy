import React, { useState } from "react";
import "./login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../../firebase.config";

import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [fileUser, setFileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    console.log(nameUser.replace(/\s+/g, "-"));
    e.preventDefault();
    setLoading(true);
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const storageRef = ref(
            storage,
            `imagesUser/${Date.now() + nameUser.replace(/\s+/g, "")}`
          );
          const user = userCredential.user;
          const uploadTask = uploadBytesResumable(storageRef, fileUser);
          uploadTask.on(
            (error) => {
              toast.error(error.message);
            },
            () =>
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await updateProfile(user, {
                    displayName: nameUser,
                    photoURL: downloadURL,
                  });
                  //store user data in firebase store database
                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: nameUser,
                    email,
                    photoURL: downloadURL,
                  });
                }
              )
          );
          setLoading(false);
          navigate("/login");
          toast.success("Account created");
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Not upload up firebase");
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col>
                <h5 className="text-center ">Loading....</h5>{" "}
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold d-block mb-3 ">Sign Up</h3>

                <Form className="auth_form" onSubmit={signup}>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Enter user name"
                      value={nameUser}
                      onChange={(e) => setNameUser(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="number"
                      placeholder="Enter user number phone"
                      value={phoneUser}
                      onChange={(e) => setPhoneUser(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="file"
                      onChange={(e) => setFileUser(e.target.files[0])}
                    />
                  </FormGroup>

                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="buy_btn auth_btn ">
                    Create an account
                  </motion.button>
                  <p>
                    Already have a account ? <Link to="/login">Login</Link>
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
