const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/error");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

// App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/urls", require("./routes/urlRoute"));

// Custom Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
