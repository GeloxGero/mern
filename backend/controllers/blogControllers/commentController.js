import asyncHandler from "express-async-handler";
import Comment from "../../models/blogModels/commentModel.js";

const getAllComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find().lean();

	// If no comments
	if (!comments?.length) {
		return res.status(400).json({ message: "No comments found" });
	}

	res.json(comments);
});

const addNewComment = asyncHandler(async (req, res) => {
	const { text, blog, comment } = req.body;

	// Confirm data
	if (!text || !(blog || comment)) {
		return res.status(400).json({
			message: {
				blog,
				comment,
			},
		});
	}

	if (blog && comment) {
		return res
			.status(400)
			.json({ message: "Can only reply to one person at a time" });
	}

	// Create and store the new comment
	const newComment = await Comment.create({
		text,
		blog,
		comment,
	});

	if (newComment) {
		// Created
		return res.status(201).json({ message: "New Comment Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateComment = asyncHandler(async (req, res) => {
	const { id, text, blog, comment } = req.body;

	// Confirm data
	if (!id || !text || !(blog || comment)) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Confirm comment exists to update
	const newComment = await Comment.findById(id).exec();

	if (!newComment) {
		return res.status(400).json({ message: "Comment not found" });
	}

	newComment.text = text;
	newComment.blog = blog;
	newComment.comment = comment;

	const updatedComment = await newComment.save();

	res.json({
		message: {
			newComment,
			updatedComment,
		},
	});
});

const deleteComment = asyncHandler(async (req, res) => {
	//delete all comments branching out from this comment

	res.status(200).json({ message: "delete comment" });
});

export { getAllComments, addNewComment, updateComment, deleteComment };
