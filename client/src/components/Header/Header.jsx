import React, { useContext } from "react";
import "../../SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { ElearningContext } from "../../context/ElearningContext";
import axios from "axios";
import { toast } from "sonner";
const Header = () => {
  const { deleteCookie, cookie } = useContext(ElearningContext);
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     deleteCookie();
  //     window.localStorage.setItem("role", "");
  //     window.localStorage.setItem("username", "");
  //     window.localStorage.setItem("adm", "");

  //     await axios.delete("http://localhost:3005/auth/logout");
  //     navigate("/LoginPage");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/v1/user/logout`);
      deleteCookie();
      window.localStorage.setItem("role", "");
      window.localStorage.setItem("username", "");
      window.localStorage.setItem("adm", "");
      navigate("/LoginPage");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="/wifiii.png" alt="Women bandari Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>{" "}
          {/* Updated Home link to use Link */}
          
          
          <li><Link to="/services">Services</Link></li>

                  

          
          <li>
            <Link to="/dashboard">Profile/Dashboard</Link>
          </li>{" "}
          {/* Link to Pdash.js */}
        </ul>
        <button onClick={() => navigate("/contact")} className="contact-btn">
          Contact
        </button>

        {cookie?.authenticated && (
          <button onClick={logOutHandler} className="contact-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
