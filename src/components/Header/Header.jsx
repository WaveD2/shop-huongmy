import React, { useRef, useEffect } from "react";
import imgUser from "../../assets/images/user-icon.png";
import "./Header.css";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../custom-hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import Logo from "../UI/Logo";
// import { cartActions, cartActiveActions } from "../../redux/slices/cartSlice";

const Nav_link = [
  {
    path: "home",
    display: "Trang chủ",
  },
  {
    path: "shop",
    display: "Sản phẩm",
  },
  {
    path: "cart",
    display: "Giỏ hàng",
  },
];

const Nav_admin = [
  {
    path: "/dashboard",
    display: "Biểu đồ",
  },
  {
    path: "/dashboard/all-products",
    display: "Sản phẩm",
  },
  {
    path: "dashboard/add-product",
    display: "Tạo sản phẩm",
  },
  {
    path: "dashboard/users",
    display: "Người dùng",
  },
];
const Header = ({ info }) => {
  const menuItemNav = info === "admin" ? Nav_admin : Nav_link;
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalHeart = useSelector((state) => state.cart.totalHeart);

  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const currentUser = useAuth();
  const profileActionRef = useRef();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current?.classList?.add("sticky_header");
      } else {
        headerRef?.current?.classList?.remove("sticky_header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Đăng Xuất Thành Công");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  const toggleProfileAction = () =>
    profileActionRef.current.classList.toggle("show_profile_action");

  return (
    <header className="header " ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <Link to="/home" className="logo">
              <img src={logo} alt="logo" />
              <Logo />
            </Link>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {menuItemNav.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : " "
                      }>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              <span
                className="heart_icon"
                onClick={() => {
                  if (currentUser) {
                    navigate("/heart");
                  }
                }}>
                <i className="ri-heart-line"></i>
                <span className="badge">{totalHeart}</span>
              </span>
              <span
                className="cart_icon"
                onClick={() => {
                  // dispatch(
                  //   cartActiveActions.statusActive({
                  //     isActive: true,
                  //   })
                  // );
                  navigate("/cart");
                }}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL || imgUser}
                  alt="avatar user"
                  className="profile"
                  onClick={toggleProfileAction}
                />
                <div ref={profileActionRef} className="profile_action">
                  {currentUser ? (
                    <Link className="w-100 text-center" onClick={logout}>
                      <span onClick={toggleProfileAction}> Đăng Xuất</span>
                    </Link>
                  ) : (
                    <div
                      className="d-flex flex-column text-center w-100"
                      onClick={toggleProfileAction}>
                      <Link to="/login">Đăng nhập</Link>
                      <Link to="/signup">Đăng kí</Link>
                      {/* <Link to="/dashboard">Biểu đồ</Link> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu ">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
