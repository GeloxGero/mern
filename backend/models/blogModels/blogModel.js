import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
