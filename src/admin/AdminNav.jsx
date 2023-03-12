import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../custom-hook/useAuth";
import "./styles.css";
import imgDefaut from "../assets/images/user-icon.png";
import Search from "../components/Search";

const admin_nav = [
  { display: "Biểu đồ", path: "/dashboard" },
  { display: "Sản phẩm", path: "/dashboard/all-products" },
  { display: "Sản phẩm đã bán", path: "/dashboard/orders" },
  { display: "Người dùng", path: "/dashboard/users" },
];

const AdminNav = () => {
  const currentUser = useAuth();
  const isActiveCloseMobile = useRef();
  const isActiveMenuMobile = useRef();
  const menuMobileToggle = () => {
    console.log(isActiveMenuMobile);
    isActiveMenuMobile.current.classList.toggle("menuActive");
    isActiveCloseMobile.current.classList.toggle("menuActive");
  };
  return (
    <>
      <header className="admin_header">
        <div className="admin_nav-top">
          <Container>
            <div className="admin_nav-wrapper-top">
              <div className="logo">
                <Link to="/home">
                  <h2>WaveD</h2>
                </Link>
              </div>
              <Search />

              <div className="admin_nav-top-right">
                <span>
                  <i className="ri-notification-2-line"></i>
                </span>
                <span>
                  <i className="ri-settings-3-line"></i>
                </span>

                <img src={currentUser.photoURL || imgDefaut} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin_menu p-0">
        <Container>
          <Row>
            <div className="admin_nav">
              <ul className="admin_menu-list" ref={isActiveMenuMobile}>
                {admin_nav.map((item, index) => (
                  <li
                    className="admin_menu-item "
                    key={index}
                    onClick={menuMobileToggle}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
              <div className="mobile_menu ">
                <Search />
                <span onClick={menuMobileToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
              <span
                style={{ fontSize: "26px" }}
                className="mobile_menu-close"
                onClick={menuMobileToggle}
                ref={isActiveCloseMobile}>
                <i className="ri-close-line"></i>
              </span>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
