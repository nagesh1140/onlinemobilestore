const express = require("express");
const path = require("path");
const authcontroller = require("../controllers/siginin");
const Productcontroller = require("../controllers/products");

var Publishable_Key =
  "pk_test_51HYQO1AgPlpBILOrsuCSBGWgDPmP30dlRjUjoIFMuTPJPOpt0DGgTxIQALbxhsPpBcJV3Mlo96YmEQ5M78KmHyJ200YlTbd5y0";
var Secret_Key =
  "sk_test_51HYQO1AgPlpBILOrOXWPlggW5P74nhUpVcbF13gHr2N3NAxwtlOycsnrqyxzWgCWkftHqEB0BRNWpXnGhDK3dzDs00piese8g2";

const stripe = require("stripe")(Secret_Key);

const router = express.Router();

router.get("/login", authcontroller.getLogin);

router.post("/login", authcontroller.postLogin);

router.get("/Registration", authcontroller.getRegistration);

router.post("/Registration", authcontroller.postSignup);

router.get("/Adminlogin", authcontroller.getAdminLogin);

router.post("/Adminlogin", authcontroller.postAdminLogin);

router.get("/Adminsignup", authcontroller.getAdminRegistration);

router.post("/Adminsignup", authcontroller.postAdminSignup);

module.exports = router;
