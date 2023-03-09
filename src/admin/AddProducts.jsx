import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();

    // add product to the firebase database
    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error("images not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              title: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
          toast.success("product success added");
          navigate("/dashboard/all-products");
        }
      );
    } catch (error) {}
    toast.success("Crate Product Success ");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            {loading ? (
              <h4 className="py-5 fw-bold">Loading....</h4>
            ) : (
              <>
                <h4>Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      required
                      type="text"
                      placeholder="Double sofa"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      required
                      type="text"
                      placeholder="Double sofa"
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Short Description</span>
                    <input
                      required
                      type="text"
                      placeholder="Lorem..."
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                    />
                  </FormGroup>
                  <div className=" d-flex align-items-center  gap-5 justify-content-between">
                    <FormGroup className="form_group w-50">
                      <span>Price</span>
                      <input
                        required
                        type="number"
                        placeholder="$100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup
                      className="form_group w-50"
                      value={enterCategory}
                      onChange={(e) => setEnterCategory(e.target.value)}>
                      <span>Category</span>
                      <select className="w-100">
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form_group">
                      <span>Product Image</span>
                      <input
                        required
                        type="file"
                        onChange={(e) => {
                          setEnterProductImg(e.target.files[0]);
                        }}
                      />
                    </FormGroup>

                    <button className="buy_btn">Add Product</button>
                  </div>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
