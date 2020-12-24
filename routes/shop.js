const express = require("express");
const path = require("path");
const Productcontroller = require("../controllers/products");

var Publishable_Key =
  "pk_test_51HYQO1AgPlpBILOrsuCSBGWgDPmP30dlRjUjoIFMuTPJPOpt0DGgTxIQALbxhsPpBcJV3Mlo96YmEQ5M78KmHyJ200YlTbd5y0";
var Secret_Key =
  "sk_test_51HYQO1AgPlpBILOrOXWPlggW5P74nhUpVcbF13gHr2N3NAxwtlOycsnrqyxzWgCWkftHqEB0BRNWpXnGhDK3dzDs00piese8g2";

const stripe = require("stripe")(Secret_Key);

const router = express.Router();

router.get("/", Productcontroller.getProducts);

router.get("/Mobiles", Productcontroller.getShop);

router.get("/Adminpage", Productcontroller.getlogins);

router.get("/MobileReports", Productcontroller.getbookings);

router.get("/addproduct", Productcontroller.getAddproduct);

router.post("/checkout", Productcontroller.postCheckoutPage);

router.post("/addproduct", Productcontroller.postAddproduct);

router.get("/addproduct", Productcontroller.getAddproduct);

router.post("/Mobiles", Productcontroller.getPayment);

router.post("/details", Productcontroller.postshippingDetails);

module.exports = router;