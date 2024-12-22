import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/skills", projectRoutes);

module.exports = app;


export default app;