import express from "express";
const router = express.Router();
import {
	addNewBlog,
	updateBlog,
	getAllBlogs,
	deleteBlog,
} from "../../controllers/blogControllers/blogController.js";

router.get("/", getAllBlogs);
router.put("/edit", updateBlog);
router.post("/add", addNewBlog);
router.delete("/delete", deleteBlog);

export default router;
