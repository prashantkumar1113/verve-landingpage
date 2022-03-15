require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on PORT=${PORT}`
    );
});
