const { User } = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, admNumber } =
      req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not matched" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "user already exist try different" });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    //profilePhoto
    const malePP = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femalePP = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      admNumber,
      fullName,
      username,
      password: hassedPassword,
      profilePhoto: gender === "male" ? malePP : femalePP,
      gender,
    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Incorrect Username or Password" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "username or password is incorrect",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, "your_jwt_secret", {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // sameSite: "strict",
      })
      .json({
        success: true,
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        role: user.role,
        admNumber: user.admNumber,
        isAuthenticated: true,
        message: "logged in",
      });
  } catch (error) {
    res.status(500).json({ message: "failed login", success: false });
    console.log(error);
  }
};

const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "You are log out" });
  } catch (error) {
    console.log(error);
  }
};

const getOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, logout, getOtherUser };
