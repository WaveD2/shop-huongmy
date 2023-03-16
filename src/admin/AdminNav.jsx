import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../custom-hook/useAuth";
import "./styles.css";
import imgDefaut from "../assets/images/user-icon.png";
import Logo from "../components/UI/Logo";

const admin_nav = [
  { display: "Biểu đồ", path: "/dashboard" },
  { display: "Sản phẩm", path: "/dashboard/all-products" },
  { display: "Tạo sản phẩm", path: "/dashboard/add-product" },
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
    <section className="admin_menu p-0">
      <Container>
        <Row>
          <div className="admin_nav">
            <div className="logo">
              <Link to="/home">
                <Logo />
              </Link>
            </div>
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
            <div className="admin_nav-top-right">
              <span>
                <i className="ri-notification-2-line"></i>
              </span>
              <span>
                <i className="ri-settings-3-line"></i>
              </span>

              <img src={currentUser.photoURL || imgDefaut} alt="" />
            </div>
            <div className="mobile_menu ">
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
  );
};

export default AdminNav;
