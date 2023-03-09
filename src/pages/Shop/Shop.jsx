import React, { useState } from "react";
import CommonSelection from "../../components/UI/CommonSelection";
import Helmet from "../../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import "./Shop.css";

import products from "../../assets/data/products";
import ProductList from "../../components/UI/ProductList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    const filterProducts = products?.filter(
      (item) => item.category === filterValue.toString()
    );

    setProductsData(filterProducts.length ? filterProducts : products);
  };

  const handleSearch = (e) => {
    const searchItem = e.target.value;

    const searchProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchItem.toLowerCase())
    );

    setProductsData(searchProducts);
  };

  return (
    <Helmet title={"Shop"}>
      {/* <CommonSelection title="Products" /> */}

      <section className="">
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className="filter_widget">
                <select name="" id="">
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center">No products</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
