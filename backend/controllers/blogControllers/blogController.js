import asyncHandler from "express-async-handler";
import Blog from "../../models/blogModels/blogModel.js";

const getAllBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find().lean();

	// If no blogs
	if (!blogs?.length) {
		return res.status(400).json({ message: "No blogs found" });
	}

	res.json(blogs);
});

const addNewBlog = asyncHandler(async (req, res) => {
	const { title, text } = req.body;

	// Confirm data
	if (!title || !text) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Create and store the new user
	const blog = await Blog.create({
		title,
		text,
	});

	if (blog) {
		// Created
		return res.status(201).json({ message: "New Blog Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateBlog = asyncHandler(async (req, res) => {
	const { id, title, text } = req.body;

	// Confirm data
	if (!id || !title || !text) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Confirm note exists to update
	const blog = await Blog.findById(id).exec();

	if (!blog) {
		return res.status(400).json({ message: "Blog not found" });
	}

	blog.title = title;
	blog.text = text;

	const updatedBlog = await blog.save();

	res.json(`Blog '${updatedBlog.id}' updated`);
});

const deleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.body;

	// Confirm data
	if (!id) {
		return res.status(400).json({ message: "Blog ID required" });
	}

	// Confirm note exists to delete
	const blog = await Blog.findById(id).exec();

	if (!blog) {
		return res.status(400).json({ message: "Blog not found" });
	}

	const result = await blog.deleteOne();
	res.json(`Blog ${result._id} ${result.title} deleted`);
});

export { getAllBlogs, addNewBlog, updateBlog, deleteBlog };
