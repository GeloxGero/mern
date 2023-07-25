import express from "express";
const router = express.Router();
import {
	addNewCrudCategory,
	updateCrudCategory,
	getAllCrudCategories,
	deleteCrudCategory,
} from "../../../controllers/projectControllers/crudControllers/crudCategoryController.js";

router.get("/", getAllCrudCategories);
router.put("/edit", updateCrudCategory);
router.post("/add", addNewCrudCategory);
router.delete("/delete", deleteCrudCategory);

export default router;
