import asyncHandler from "express-async-handler";
import CrudCategory from "../../../models/projectModels/crudModels/crudCategory.js";

const getAllCrudCategories = asyncHandler(async (req, res) => {
	const crudCategories = await CrudCategory.find().lean();

	// If no crudCategories
	if (!crudCategories?.length) {
		return res.status(400).json({ message: "No Categories found" });
	}

	res.json(crudCategories);
});

const addNewCrudCategory = asyncHandler(async (req, res) => {
	const { name, quantity } = req.body;

	// Confirm data
	if (!name) {
		return res.status(400).json({
			message: "Name is required",
		});
	}

	// Create and store new category
	const newCrudCategory = await CrudCategory.create({
		name,
		quantity,
	});

	if (newCrudCategory) {
		// Created
		return res.status(201).json({ message: "New Category Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateCrudCategory = asyncHandler(async (req, res) => {
	const { id, name } = req.body;

	// Confirm data
	if (!id || !name) {
		return res.status(400).json({ message: "Name and ID required" });
	}

	// Confirm Category exists to update
	const newCrudCategory = await CrudCategory.findById(id).exec();

	if (!newCrudCategory) {
		return res.status(400).json({ message: "Category not found" });
	}

	newCrudCategory.name = name;

	const updatedCrudCategory = await newCrudCategory.save();

	res.json({
		message: `Category ${updatedCrudCategory.name} has been successfully updated`,
	});
});

const deleteCrudCategory = asyncHandler(async (req, res) => {
	//delete all crudCategories branching out from this crudCategory
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Category Id required" });
	}

	// Confirm note exists to delete
	const category = await CrudCategory.findById(id).exec();

	if (!category) {
		return res.status(400).json({ message: "Category not found" });
	}

	const result = await category.deleteOne();
	res.json(`Category ${result._id} ${result.name} deleted`);
});

export {
	getAllCrudCategories,
	addNewCrudCategory,
	updateCrudCategory,
	deleteCrudCategory,
};
