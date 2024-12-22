import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes.routes.js"
import skillRoutes from "./routes/skill.routes.js"
import connectDB from "./config/dbConnection.js"
// import projectRoutes from "./routes/projectRoutes.routes.js"
dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);


// app.use("/api/projects", projectRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
