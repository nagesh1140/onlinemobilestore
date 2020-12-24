const User = require("../models/user");
const Admin = require("../models/admin");
const Login = require("../models/logindetails");
const dateTime = require("node-datetime");
const path = require("path");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("CustomerLogin", { path: "/CustomerLogin" });
};

exports.getRegistration = (req, res, next) => {
  res.render("CustomerRegistration", { path: "/CustomerRegistration" });
};

exports.getAdminLogin = (req, res, next) => {
  res.render("AdminLogin", { path: "/AdminLogin" });
};

exports.getAdminRegistration = (req, res, next) => {
  res.render("AdminRegistration", { path: "/AdminRegistration" });
};

exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user) {
    const error = "Email already exist login";
    res.render("CustomerRegistration", {
      error: error,
      path: "/CustomerRegistration",
    });
  }

  const hashedPwd = await bcrypt.hash(password, 15);
  try {
    const user = new User({
      name: name,
      email: email,
      password: hashedPwd,
    });
    const result = await user.save();
    res.status(201).redirect("/CustomerLogin");
  } catch (err) {
    console.log(err);
    res.redirect("/CustomerRegistration");
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = "A user with this email could not be found";
      res.render("CustomerLogin", {
        error: error,
        path: "/CustomerLogin",
      });
    }
    global.name = user.name;
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      console.log("login success");
      try {
        var dt = dateTime.create();
        var logintime = dt.format("d-m-Y H:M:S");
        const login = new Login({
          name: user.name,
          email: email,
          logintime: logintime,
        });
        const result = await login.save();
        console.log(result);
        res.redirect("/Mobiles");
      } catch (err) {
        console.log(err);
      }
    } else {
      const pwderror = "Password is incorrect";
      res.render("CustomerLogin", {
        pwderror: pwderror,
        path: "/CustomerLogin",
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.postAdminLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      const error = "A user with this email could not be found";
      res.render("AdminLogin", {
        error: error,
        path: "/AdminLogin",
      });
    }
    const isEqual = await bcrypt.compare(password, admin.password);
    if (!isEqual) {
      console.log("wrong password");
      const pwderror = "Password is incorrect";
      res.render("AdminLogin", {
        pwderror: pwderror,
        path: "/AdminLogin",
      });
    } else {
      console.log("login success");
      res.redirect("/Adminpage");
    }
  }
 catch (err) {
    console.log(err);
  }
};

exports.postAdminSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const admin = await Admin.findOne({ email: email });
  if (admin) {
    const error = "Email already exist login";
    res.render("AdminRegistration", {
      error: error,
      path: "/AdminRegistration",
    });
  }else {

  const hashedPwd = await bcrypt.hash(password, 15);
  try {
    const admin = new Admin({
      name: name,
      email: email,
      password: hashedPwd,
    });
    const result = await admin.save();
    res.status(201).redirect("/admin");
  } catch (err) {
    console.log(err);
    res.redirect("AdminRegistration");
  }
}
};
