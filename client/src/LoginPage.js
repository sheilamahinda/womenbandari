import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginPage.css"; // You will define your custom styles here
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "./redux/userSlice";

import { ElearningContext } from "./context/ElearningContext";
import { useDispatch } from "react-redux";

function LoginPage() {
  const { updateLoading, updateAuthenticated, updateDetails, setStorage } =
    useContext(ElearningContext);

  const navigate = useNavigate();

  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password } = signUpDetails;

    if (email && password) {
      try {
        updateLoading(true);
        const response = await axios.post(
          `http://localhost:3005/auth/login`,
          { username: email, password },
          { withCredentials: true }
        );

        const { message, user, success, isAuthenticated } = response.data;

        if (success) {
          window.localStorage.setItem("role", user?.role);
          window.localStorage.setItem("username", user?.username);
          window.localStorage.setItem("adm", user?.admNumber);

          updateAuthenticated(isAuthenticated);
          updateDetails(user);
          toast.success(message);
          setStorage();
          navigate("/dashboard", { replace: true });
        } else {
          toast.error(message);
          console.log(message);
        }

        updateLoading(false);
      } catch (error) {
        console.log(error.message);
        updateLoading(false);
      }
    } else {
      toast.error("email and password are required");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      updateLoading(true);
      const response = await axios.post(
        `http://localhost:3005/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const {
        success,
        username,
        _id,
        role,
        admNumber,
        isAuthenticated,
        message,
      } = response.data;

      if (success) {
        dispatch(setAuthUser(response.data));
        window.localStorage.setItem("_id", _id);

        window.localStorage.setItem("role", role);
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("adm", admNumber);

        updateAuthenticated(isAuthenticated);
        updateDetails(user);
        setStorage();
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(message);
        console.log(message);
      }

      updateLoading(false);
    } catch (error) {
      updateLoading(false);

      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-page">
      <Header />
      <section className="login-container">
        <div className="login-left">
          <h1>Sign In</h1>
          <p>Welcome</p>
          <p>
            If don't have an account, Register. You can{" "}
            <p style={{ color: "blue" }}>
              <Link to="/SignUp">Register here!</Link>
            </p>
          </p>
          <img
            src="/lapt.png"
            alt="Login illustration"
            className="login-illustration"
          />
        </div>
        <div className="login-right">
          <h2>Sign In</h2>
          <form className="login-form" onSubmit={onSubmitHandler}>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">Username </span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10 bg-white"
                type="text"
                placeholder="Enter Your Username Please"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">Password </span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10 bg-white"
                type="password"
                placeholder="Enter Your Password Please"
              />
            </div>

            {/* <input
              type="text"
              name="email"
              placeholder="Enter email or user name"
              value={signUpDetails.email}
              onChange={handleChanges}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpDetails.password}
              onChange={handleChanges}
            /> */}
            {/* <div className="forgot-password">
              <a href="#forgot-password">Forgot password?</a>
            </div> */}
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          <div className="or">
            <p></p>
            <div className="social-login-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-google"></i>
              <i className="fab fa-apple"></i>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LoginPage;
