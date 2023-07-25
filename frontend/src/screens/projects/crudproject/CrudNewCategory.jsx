import { Form, Formik, Field } from "formik";

import { useAddCrudCategoryMutation } from "../../../slices/projectSlices/crudCategorySlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function CrudNewCategory() {
	const navigate = useNavigate();

	const [
		addCrudCategory,
		{ isLoading: addLoading, isError: addError, isSuccess: addSuccess },
	] = useAddCrudCategoryMutation();

	const initialValues = {
		name: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
	});

	const handleSubmit = async (values, actions) => {
		console.log(values);
		await addCrudCategory({
			name: values.name,
		});
	};

	let content;

	if (addLoading) content = <h1>Loading...</h1>;
	else {
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

							<button type="submit">Add</button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}

	if (addSuccess) {
		navigate("/projects/crud");
	}

	return content;
}
