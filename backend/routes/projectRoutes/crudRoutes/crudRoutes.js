import express from "express";
const router = express.Router();
import {
	addNewCrudItem,
	updateCrudItem,
	getAllCrudItems,
	deleteCrudItem,
} from "../../../controllers/projectControllers/crudControllers/crudItemController.js";

router.get("/", getAllCrudItems);
router.put("/edit", updateCrudItem);
router.post("/add", addNewCrudItem);
router.delete("/delete", deleteCrudItem);

export default router;
