require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const protect = require("./middleware/authMiddleware");
const app = express(); 

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");


connectDB();
 
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

app.get("/",(req,res)=>{
    res.send("backend running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT} `);
    
});