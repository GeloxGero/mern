import { Form, Formik, Field } from "formik";

import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
import { useAddCrudItemMutation } from "../../../slices/projectSlices/crudItemSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function CrudNewItem() {
	const navigate = useNavigate();

	const {
		data: categories,
		isLoading: categoriesLoading,
		isSuccess: categoriesSuccess,
		isError: categoriesIsError,
		error: categoriesError,
	} = useGetCrudCategoriesQuery();

	const [
		addCrudItem,
		{ isLoading: addLoading, isError: addError, isSuccess: addSuccess },
	] = useAddCrudItemMutation();

	const initialValues = {
		name: "",
		price: 0,
		quantity: 0,
		category: "",
		description: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
		price: Yup.number().required("Required Price"),
		quantity: Yup.number().required("Required Quantity"),
		category: Yup.string().required("Required Category"),
		description: Yup.string().required("Required Description"),
	});

	const handleSubmit = async (values, actions) => {
		console.log(values);
		await addCrudItem({
			name: values.name,
			price: values.price,
			quantity: values.quantity,
			category: values.category,
			description: values.description,
		});
	};

	let content;

	if (addLoading) content = <h1>Loading...</h1>;
	if (addSuccess) {
		navigate("/projects/crud");
	}

	if (categoriesSuccess && !addLoading) {
		content = (
			<div className="update-item">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => (
						<Form>
							<Field type="text" name="name" value={props.values.name} />
							<Field type="number" name="price" value={props.values.price} />
							<Field
								type="number"
								name="quantity"
								value={props.values.quantity}
							/>
							<Field as="select" name="category" value={props.values.category}>
								{categories.map((category, index) => (
									<option value={category._id} key={index}>
										{category.name}
									</option>
								))}
							</Field>
							<Field
								type="text"
								name="description"
								value={props.values.description}
							/>

							<button type="submit">Add</button>
						</Form>
					)}
				</Formik>
			</div>
		);
	} else {
		content = <h1>Loading...</h1>;
	}

	return content;
}
