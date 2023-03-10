import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../../components/Helmet/Helmet";
import ProductList from "../../components/UI/ProductList";
import Service from "../../service";
import Clock from "../../components/UI/Clock";
import useGetDataFireBase from "../../custom-hook/useGetDataFireBase";

import dataProductCarts from "../../assets/data/products";
import counterImg from "../../assets/images/counter-timer-img.png";
import HeroImg from "../../assets/images/hero-img.png";
import "./Home.css";

const Home = () => {
  const { data: product, loading } = useGetDataFireBase("products");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const filterTrendingProduct = dataProductCarts.filter(
      (item) => item.category === "chair"
    );
    const filterBestSalesProduct = dataProductCarts.filter(
      (item) => item.category === "sofa"
    );
    const filterWirelessProduct = dataProductCarts.filter(
      (item) => item.category === "wireless"
    );
    const filterMobileProduct = dataProductCarts.filter(
      (item) => item.category === "mobile"
    );
    const filterPopularProduct = dataProductCarts.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filterTrendingProduct);
    setBestSalesProducts(filterBestSalesProduct);
    setWirelessProducts(filterWirelessProduct);
    setMobileProducts(filterMobileProduct);
    setPopularProducts(filterPopularProduct);
  }, [product]);

  return (
    <Helmet title="Home">
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <h1>Shop H?????ng M???</h1>
                <h2>Uy t??n, ch???t l?????ng l??m n??n th????ng hi???u</h2>
                <p>
                  C???a h??ng{" "}
                  <span
                    style={{
                      fontSize: "24px",
                      color: "var( --primary-color)",
                    }}>
                    H?????ng M???{" "}
                  </span>
                  chuy??n s??? l??? qu???n ??o - gi??y d??p tr??? em <br />
                  Li??n h??? : 09882335**
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn ">
                  <Link to="/shop">MUA H??NG NGAY !</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={HeroImg} alt="b??n gh??? ?????p" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Service />

      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">S???n ph???m b??n ch???y</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold py-2">Loading...</h5>
            ) : (
              <ProductList data={trendingProducts} isBtn={true} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">S???n ph???m Seal</h2>
            </Col>
            <ProductList data={bestSalesProducts} isBtn={true} />
          </Row>
        </Container>
      </section>

      <section className="timer_count">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="clock_top-content">
                <h4 className="text-white fs-6 mb-2">Si??u ph???m gi???m gi??</h4>
                <h3 className="text-white fs-5 mb-3">B???t ?????u sau</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.1 }}
                className="buy_btn store_btn">
                <Link to="/shop">Kh??m ph?? ngay b??y gi???</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter_img">
              <img src={counterImg} alt="b??n gh??? ??m" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new_arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">??i???n tho???i & Tai nghe</h2>
            </Col>
            <ProductList data={wirelessProducts} />
            <ProductList data={mobileProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular_category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">?????ng H???</h2>
            </Col>
            <ProductList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
