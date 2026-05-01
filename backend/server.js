require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(console.log);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});