// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const connectDB = require("./config/db");

// connectDB();

// const app = express();
// const port = 3000;

// //Connection to the Mongodb
// mongoose.connect("mongodb://127.0.0.1:27017/blogging")
// .then(()=>{
//     console.log("Mongodb connected successfully");
// })

// .catch((error)=>{
//     console.log("mongodb connection error:",error);
// });

// const postsRouter = require("./routes/posts");

// // ==========================
// // MIDDLEWARE
// // ==========================

// app.use(cors());
// app.use(express.json());

// // ==========================
// // POSTS ROUTER
// // ==========================

// app.use("/posts", postsRouter);

// // ==========================
// // HOME ROUTE
// // ==========================

// app.get("/", (req, res) => {
//     res.send("Backend is running");
// });

// // ==========================
// // START SERVER
// // ==========================

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Posts Router
const postsRouter = require("./routes/posts");

app.use("/posts", postsRouter);

// Home Route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});