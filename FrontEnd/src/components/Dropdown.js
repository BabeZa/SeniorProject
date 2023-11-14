import React, { useState, useContext } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AuthContext, SelectContext } from "../context/index";

function Dropdown() {
  const { t } = useTranslation();
  const [click, setClick] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { modalIsOpen2, setModalIsOpen2 } = useContext(SelectContext);

  const handleClick = () => setClick(!click);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      toast.success("Logout successfully");
      window.location.reload();
      setClick(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu-za clicked" : "dropdown-menu-za"}
      >
        <li>
          <Link
            className="dropdown-link-za"
            to="/professor"
            onClick={() => setClick(false)}
          >
            {t("dropdown.home")}
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-link-za"
            to="/profile"
            onClick={() => setClick(false)}
          >
            {t("dropdown.edit")}
          </Link>
        </li>
        {/* <li>
          <Link
            className="dropdown-link-za"
            to="#"
            onClick={() => setClick(false)}
          >
            {t('dropdown.feedback')}
          </Link>
        </li> */}
        <li>
          <Link
            className="dropdown-link-za b"
            onClick={() => setModalIsOpen2(true)}
          >
            {t("dropdown.changepass")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-link-za c" onClick={logout}>
            {t("dropdown.logout")}
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;
