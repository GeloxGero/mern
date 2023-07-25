import asyncHandler from "express-async-handler";
import CrudItem from "../../../models/projectModels/crudModels/crudModel.js";

const getAllCrudItems = asyncHandler(async (req, res) => {
	const crudItems = await CrudItem.find().lean();

	// If no crudItems
	if (!crudItems?.length) {
		return res.status(400).json({ message: "No Items found" });
	}

	res.json(crudItems);
});

const addNewCrudItem = asyncHandler(async (req, res) => {
	const { name, price, category, quantity, description } = req.body;

	// Confirm data
	if (!name || !price || !category || !quantity || !description) {
		return res.status(400).json({
			message: "All fields required",
		});
	}

	// Create and store the new crudItem
	const newCrudItem = await CrudItem.create({
		name,
		price,
		category,
		quantity,
		description,
	});

	if (newCrudItem) {
		// Created
		return res.status(201).json({ message: "New Item Created" });
	} else {
		return res.status(400).json({ message: "Invalid data received" });
	}
});

const updateCrudItem = asyncHandler(async (req, res) => {
	const { id, name, price, category, quantity, description } = req.body;

	// Confirm data
	if (!id || !name || !price || !category || !quantity || !description) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const updatedCrudItem = await CrudItem.findOneAndUpdate(
		{ _id: id },
		{ name, price, category, quantity, description }
	);

	if (!updatedCrudItem) res.json({ message: "Invalid values" });
	res.json({
		message: `Updated Item ${updatedCrudItem.name}`,
	});
});

const deleteCrudItem = asyncHandler(async (req, res) => {
	//delete all crudItems branching out from this crudItem

	const { id } = req.body;

	const item = await CrudItem.findById(id).exec();
	if (!item) {
		res.status(401).json({ message: "Item Not Found" });
	}

	const result = await CrudItem.deleteOne({ _id: id });
	res.status(200).json({ message: "Item Deleted" });
});

export { getAllCrudItems, addNewCrudItem, updateCrudItem, deleteCrudItem };
