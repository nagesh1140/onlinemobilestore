const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const routes = require("./routes/route");

const shop = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
app.use(shop);

mongoose
    .connect(
        "mongodb+srv://Chakradhar:Chinnu@143@cluster0.c2li5.mongodb.net/Mobiles?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((result) => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));