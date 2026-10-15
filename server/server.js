
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Posts Router
const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

// Home Route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
