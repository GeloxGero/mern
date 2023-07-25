import mongoose from "mongoose";
import CrudCategory from "./crudCategory.js";

const crudItemSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "CrudCategory",
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

crudItemSchema.pre("save", async function (next) {
	var item = this;

	if (item.isNew) {
		await CrudCategory.findByIdAndUpdate(item.category, {
			$inc: { quantity: item.quantity },
		})
			.then((doc) => {
				console.log("Document updated");
			})
			.catch((err) => {
				return next(err);
			});
	}
	next();
});

crudItemSchema.pre("findOneAndUpdate", async function (next) {
	const item = await this.model.findOne(this.getQuery());
	const update = this.getUpdate();
	const difference = item.quantity - update.quantity;

	await CrudCategory.findByIdAndUpdate(item.category, {
		$inc: { quantity: -difference },
	})
		.then((doc) => {
			console.log(`Document updated`);
		})
		.catch((err) => {
			console.log(new Error(`Error: ${err}`));
		});

	next();
});

crudItemSchema.pre("deleteOne", async function (next) {
	const item = await CrudItem.findById(this.getQuery()._id);

	await CrudCategory.findByIdAndUpdate(item.category, {
		$inc: { quantity: -item.quantity },
	})
		.then((doc) => {
			console.log(`Document deleted`);
		})
		.catch((err) => {
			console.log(new Error(`Error: ${err}`));
		});

	next();
});

const CrudItem = mongoose.model("CrudItem", crudItemSchema);

export default CrudItem;
