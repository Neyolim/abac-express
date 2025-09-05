import express from "express";
import { port } from "./config/env.js";
import projectRoutes from "./routes/projectRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/project", projectRoutes);

// Error Handling
app.use(errorHandler);

// App Listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});