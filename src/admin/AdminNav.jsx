import React from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../custom-hook/useAuth";
import "./styles.css";

const admin_nav = [
  { display: "Dashboard", path: "/dashboard" },
  { display: "All-Products", path: "/dashboard/all-products" },
  { display: "Orders", path: "/dashboard/orders" },
  { display: "Users", path: "/dashboard/users" },
];

const AdminNav = () => {
  const currentUser = useAuth();

  return (
    <>
      <header className="admin_header">
        <div className="admin_nav-top">
          <Container>
            <div className="admin_nav-wrapper-top">
              <div className="logo">
                <h2>WaveD</h2>
              </div>
              <div className="search_box">
                <input type="text" placeholder="Search..." />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>

              <div className="admin_nav-top-right">
                <span>
                  <i className="ri-notification-2-line"></i>
                </span>
                <span>
                  <i className="ri-settings-3-line"></i>
                </span>

                {/* <img src={currentUser || currentUser.photoURL} alt="" /> */}
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin_menu p-0">
        <Container>
          <Row>
            <div className="admin_nav">
              <ul className="admin_menu-list">
                {admin_nav.map((item, index) => (
                  <li className="admin_menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_admin-item" : ""
                      }>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
