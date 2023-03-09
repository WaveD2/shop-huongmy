import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import CommonSelection from "../../components/UI/CommonSelection";
import { Container, Row, Col } from "reactstrap";
import "./ProductDetails.css";
import { motion } from "framer-motion";
import ProductsList from "../../components/UI/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import useGetDataFireBase from "../../custom-hook/useGetDataFireBase";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams();
  // const product = products.find((item) => item.id === id);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUer = useRef("");
  const reviewMess = useRef("");
  const { data: products } = useGetDataFireBase("products");
  const docRef = doc(db, "product", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(doc.data)();
      } else {
        console.log("no product");
      }
    };
  }, []);

  const {
    imgUrl,
    category,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
  } = product;

  const relateProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUer.current.value;
    const reviewUserMess = reviewMess.current.value;

    const reviewObjUser = {
      useName: reviewUserName,
      text: reviewMess,
      rating,
    };
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product add Cart");
  };

  useEffect(() => {}, [product]);

  return (
    <Helmet title={productName}>
      <CommonSelection />

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="sản phẩm" />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product_rating d-flex al-align-items-center gap-5 mb-4 ">
                  <span>
                    <i className="ri-star-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-fill"></i>
                  </span>
                  <span>
                    <i className="ri-star-half-line"></i>
                  </span>
                  <span>
                    <i className="ri-star-line"></i>
                  </span>
                  <span>
                    <i className="ri-star-line"></i>
                  </span>
                  <p>
                    (<span>{avgRating}</span>ratings)
                  </p>
                </div>
              </div>
              <div className="d-flex gap-5 align-items-center ">
                <span className="product_price">${price} </span>
                <span>Category : {category}</span>
              </div>
              <p className="product_des">{shortDesc}</p>
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="buy_btn"
                onClick={addToCart}>
                Add to Cart
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex al-align-items-center gap-5 mb-4">
                <h6
                  className={`${tab === "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}>
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}>
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab_content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product_review">
                  <div className="review_wrapper ">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mt-4">
                          <h6>Châu Tinh Tùng</h6>
                          <span>{item.rating}( rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review_form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form_group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUer}
                          />
                        </div>
                        <div
                          className="form_group rating_group 
                        d-flex al-align-items-center gap-5 ">
                          <motion.span
                            onClick={() => setRating(1)}
                            whileTap={{ scale: 1.1 }}>
                            1<i className="ri-star-half-line"></i>
                          </motion.span>
                          <motion.span
                            onClick={() => setRating(2)}
                            whileTap={{ scale: 1.1 }}>
                            2<i className="ri-star-half-line"></i>
                          </motion.span>
                          <motion.span
                            onClick={() => setRating(3)}
                            whileTap={{ scale: 1.1 }}>
                            3<i className="ri-star-half-line"></i>
                          </motion.span>
                          <motion.span
                            onClick={() => setRating(4)}
                            whileTap={{ scale: 1.1 }}>
                            4<i className="ri-star-half-line"></i>
                          </motion.span>
                          <motion.span
                            onClick={() => setRating(5)}
                            whileTap={{ scale: 1.1 }}>
                            5<i className="ri-star-half-line"></i>
                          </motion.span>
                        </div>

                        <div className="form_group">
                          <textarea
                            type="text"
                            rows={5}
                            required
                            placeholder="Review Message"
                            ref={reviewMess}
                          />
                        </div>
                        <button type="submit" className="buy_btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related_title">You might also like</h2>
              <div className="d-flex flex-wrap ">
                <ProductsList data={relateProducts} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
