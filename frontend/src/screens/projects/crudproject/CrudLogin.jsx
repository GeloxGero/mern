import { Form, Formik, Field } from "formik";
import { useLoginMutation } from "../../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../slices/authSlice";
import { useEffect } from "react";
import * as Yup from "yup";

export default function CrudLogin() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth);

	useEffect(() => {
		if (userData.userInfo !== null) {
			navigate("/projects/crud/admin");
		}
	});

	const [login, { isLoading }] = useLoginMutation();

	const initialValues = {
		email: "",
		password: "",
		confirmpassword: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().required("Required Name"),
		password: "",
	});

	const handleSubmit = async (values, actions) => {
		try {
			const res = await login({
				email: values.email,
				password: values.password,
			}).unwrap();

			dispatch(setCredentials(res));
			navigate("/projects/crud/admin");
		} catch (error) {
			console.log(err?.data?.message || err.error);
		}
	};

	let content;

	content = (
		<div className="update-item">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(props) => (
					<Form>
						<Field type="text" name="email" value={props.values.email} />
						<Field
							type="password"
							name="password"
							value={props.values.password}
						/>

						<button type="submit">Login</button>
					</Form>
				)}
			</Formik>
		</div>
	);

	return content;
}
