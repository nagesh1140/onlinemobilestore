const Product = require("../models/products");
const nodemailer = require("nodemailer");
const Login = require("../models/logindetails");
const Details = require("../models/shipping_details");

exports.getAddproduct = (req, res, next) => {
  res.render("Addproduct", { path: "/Addproduct" });
};

exports.postAddproduct = async (req, res, next) => {
  const name = req.body.name;
  const imagelink = req.body.imagelink;
  const cost = req.body.cost;
  try {
    const products = new Product({
      name: name,
      imagelink: imagelink,
      cost: cost,
    });
    const result = await products.save();
    res.status(201).redirect("/addproduct");
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = (req, res, next) => {
  const error = "";
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("home", {
        products: products,
        error: error,
        path: "/home",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getlogins = (req, res, next) => {
  Login.find()
    .then((logins) => {
      console.log(logins);
      res.render("AdminPage", {
        logins: logins,
        path: "/AdminPage",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getShop = (req, res, next) => {
  console.log(name);
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop", {
        name: name,
        products: products,
        path: "/shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckoutPage = (req, res, next) => {
  const prodId = req.body.productId;
  const name = req.body.name;
  console.log(name);
  console.log(prodId);
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.render("CheckoutPage", {
        product: product,
        name: name,
        path: "/CheckoutPage",
        key:
          "pk_test_51HYQO1AgPlpBILOrsuCSBGWgDPmP30dlRjUjoIFMuTPJPOpt0DGgTxIQALbxhsPpBcJV3Mlo96YmEQ5M78KmHyJ200YlTbd5y0",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postshippingDetails = async (req, res, next) => {
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const productname = req.body.productname;
  const productcost = req.body.productcost;
  console.log(productcost);
  console.log(name);
  try {
    const shippingdetails = new Details({
      firstname: firstname,
      email: email,
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      productname: productname,
      productcost: productcost,
    });
    const result = await shippingdetails.save();
    console.log(result);
    res.render("payment", {
      path: "/payment",
      firstname: firstname,
      email: email,
      name: name,
      address: address,
      city: city,
      state: state,
      productname: productname,
      productcost: productcost,
      zip: zip,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPayment = async (req, res, next) => {
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const productname = req.body.productname;
  const productcost = req.body.productcost;
  console.log(name);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ldragotechs@gmail.com",
      pass: "Ldragotechs@7",
    },
  });

  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop", {
        products: products,
        name: name,
        path: "/shop",
      });
    })
    .then((result) => {
      console.log(name);
      console.log("success");
      transporter.sendMail({
        from: "ldragotechs@gmail.com",
        to: email,
        subject: "Online shopping",
        text:
          "Name : " +
          firstname +
          "\nProduct : " +
          productname +
          "\nproductcost :" +
          productcost +
          "\nAddress : " +
          address +
          "\nCity : " +
          city +
          "\nState :" +
          state +
          "\nZip :" +
          zip +
          "\n Your order is successfully placed",
      });
      transporter.sendMail({
        from: "ldragotechs@gmail.com",
        to: "nageshgogulamuri63@gmail.com",
        subject: "customer details",
        text:
          "Name : " +
          firstname +
          "\nProduct : " +
          productname +
          "\nproductcost :" +
          productcost +
          "\nAddress : " +
          address +
          "\nCity : " +
          city +
          "\nState :" +
          state,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getbookings = (req, res, next) => {
  Details.find()
    .then((details) => {
      console.log(details);
      res.render("MobileReports", {
        details: details,
        path: "/MobileReports",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
