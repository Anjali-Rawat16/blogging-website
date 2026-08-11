const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");

// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());
app.use(express.json());

// ==========================
// POSTS ROUTER
// ==========================

app.use("/posts", postsRouter);

// ==========================
// HOME ROUTE
// ==========================

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// ==========================
// START SERVER
// ==========================

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});