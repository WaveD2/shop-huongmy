import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import useGetDataFirebase from "../custom-hook/useGetDataFireBase";
import { db, storage } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const User = () => {
  const { data: productData, loading } = useGetDataFirebase("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên </th>
                <th>Email</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <h4 className="fw-bold py-5">Loading...</h4>
              ) : (
                productData.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <img src={item.photoURL} alt="img-product" />
                      </td>
                      <td>{item.displayName}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(item.id)}>
                          Xóa tài khoản
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              )}
            </tbody>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default User;
