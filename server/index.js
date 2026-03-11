const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();    // ✅ first — loads .env variables
connectDB();        // ✅ second — connects to database

const app = express(); 
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");


app.use((req, res, next) => {
    console.log("Request hit:", req.method, req.url);
    next();
});
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});