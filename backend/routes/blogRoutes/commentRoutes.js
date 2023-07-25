import express from "express";
const router = express.Router();
import {
	addNewComment,
	updateComment,
	getAllComments,
	deleteComment,
} from "../../controllers/blogControllers/commentController.js";

router.get("/", getAllComments);
router.put("/edit", updateComment);
router.post("/add", addNewComment);
router.delete("/delete", deleteComment);

export default router;
