import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUp.css"; // You will define your custom styles here
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { toast } from "sonner";
import axios from "axios";
import { ElearningContext } from "./context/ElearningContext";

function SignUp() {
  const { updateLoading } = useContext(ElearningContext);
  const [signUpDetails, setSignUpDetails] = useState({
    admNumber: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    admNumber: "",
  });

  const checkboxHandler = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3005/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/LoginPage");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, admNumber } = signUpDetails;

    if (email && password) {
      try {
        updateLoading(true);
        const response = await axios.post(
          `http://localhost:3005/auth/register`,
          { email, password, admNumber },
          { withCredentials: true }
        );

        const { success, message } = response.data;

        if (success) {
          toast.success(message);
          navigate("/LoginPage");
        } else {
          toast.error(message);
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

  return (
    <div className="login-page">
      <Header />
      <section className="login-container">
        <div className="login-left">
          <h1>Sign Up</h1>
          <p>Welcome</p>
          <p>
            If you already have an account, login. You can{" "}
            <p>
              <p style={{ color: "blue" }}>
                <Link to="/LoginPage">Login here!</Link>
              </p>
            </p>
          </p>
          <img
            src="/lapt.png"
            alt="Login illustration"
            className="login-illustration"
          />
        </div>
        <div className="login-right">
          <h2>Sign Up</h2>
          <form className="login-form" onSubmit={onSubmitHandler}>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">Full Name </span>
              </label>
              <input
                required
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="w-full input input-bordered h-10 bg-white"
                type="text"
                placeholder="Enter Your Full Name"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">
                  Admission Number{" "}
                </span>
              </label>
              <input
                required
                value={user.admNumber}
                onChange={(e) =>
                  setUser({ ...user, admNumber: e.target.value })
                }
                className="w-full input input-bordered h-10 bg-white"
                type="text"
                placeholder="Enter Your Adm No"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">Username </span>
              </label>
              <input
                required
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10 bg-white"
                type="text"
                placeholder="Enter Your Username "
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">Password </span>
              </label>
              <input
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10 bg-white"
                type="password"
                placeholder="Enter Your Password "
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="font-medium text-black">
                  Confirm Password{" "}
                </span>
              </label>
              <input
                required
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                className="w-full input input-bordered h-10 bg-white"
                type="Confirm Password"
                placeholder="Again Enter Your Password "
              />
            </div>
            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male</p>
                <input
                  checked={user.gender === "male"}
                  onChange={() => checkboxHandler("male")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox mx-2"
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input
                  checked={user.gender === "female"}
                  onChange={() => checkboxHandler("female")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox mx-2"
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>

            {/* <input
              type="text"
              name="email"
              placeholder="Enter email or user name"
              value={signUpDetails.email}
              onChange={handleChanges}
            />
            <input
              type="text"
              name="admNumber"
              placeholder="Enter your Admission Number"
              value={signUpDetails.admNumber}
              onChange={handleChanges}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpDetails.password}
              onChange={handleChanges}
            />
      */}
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

export default SignUp;
