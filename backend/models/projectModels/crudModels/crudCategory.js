import mongoose from "mongoose";
import CrudItem from "./crudModel.js";

const crudCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

crudCategorySchema.pre("save", function (next) {
	var category = this;
	if (category.isNew) {
		category.quantity = 0;
	}
	next();
});

crudCategorySchema.pre(
	"deleteOne",
	{ document: true, query: false },
	async function (next) {
		const object = await CrudItem.deleteMany({ category: this._id });
		console.log(`Deleted ${object.deletedCount} Items`);
		console.log(object);
		next();
	}
);

const CrudCategory = mongoose.model("CrudCategory", crudCategorySchema);

export default CrudCategory;
