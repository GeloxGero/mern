import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import connectDB from "../backend/config/db.js";

import userRoutes from "./routes/userRoutes.js";

//project routes
import crudRoutes from "./routes/projectRoutes/crudRoutes/crudRoutes.js";
import crudCategoryRoutes from "./routes/projectRoutes/crudRoutes/crudCategoryRoutes.js";

//blog routes
import blogRoutes from "./routes/blogRoutes/blogRoutes.js";
import commentRoutes from "./routes/blogRoutes/commentRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/crud", crudRoutes);
app.use("/api/crudcategory", crudCategoryRoutes);

app.get("/", (req, res) => res("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on Port${PORT}`));
