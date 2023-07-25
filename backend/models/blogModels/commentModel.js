import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		blog: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
		comment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	},
	{
		timestamps: true,
	}
);

commentSchema.pre("validate", function (next) {
	if ((this.blog && this.comment) || (!this.blog && !this.comment)) {
		return next(new Error("Can only reply to a blog or a comment"));
	}
	next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
