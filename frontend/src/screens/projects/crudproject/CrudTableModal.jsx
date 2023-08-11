import styled from "styled-components";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";

const ModalContainer = styled.div`
	height: 100%;
	width: 100%;

	background-color: rgba(0, 0, 0, 0.7);
	position: fixed;
`;

const Modal = styled.div`
	height: 450px;
	width: 400px;
	border-radius: 15px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: fixed;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);

	background-color: #3f4259;

	h1 {
		position: absolute;
		top: 0;
		right: 0;
		margin-right: 15px;
		margin-top: 10px;
		font-size: 1.4em;
	}
	h1:hover {
		cursor: pointer;
	}

	form {
		display: flex;

		flex-direction: column;
	}

	.form-input {
		border: none;
		height: 45px;
		width: 320px;
		background-color: #6a758e;
		color: #c9cedb;
		margin-top: 20px;
		border-radius: 5px;
	}

	.action-buttons {
		width: 320px;
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 50px;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 20px;
		width: 120px;

		border: none;
		border-radius: 10px;
		font-weight: bolder;
		color: #f6f7fa;
	}

	button:hover {
		cursor: pointer;
	}

	button:active {
		transform: scale(0.95);
	}

	button:nth-child(1) {
		background-color: #56b0c3;
	}
	button:nth-child(2) {
		background-color: #f65959;
	}

	input:is([type="text"], [type="number"]) {
		padding: 5px;
	}

	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const CrudTableModal = ({
	itemDataObject,
	isOpen,
	onClose,
	categoriesdata,
	handleChange,
}) => {
	if (!isOpen) return null;

	const initialValues = {
		name: itemDataObject.itemdata.name,
		price: itemDataObject.itemdata.price,
		quantity: itemDataObject.itemdata.quantity,
		category: itemDataObject.itemdata.category._id,
		description: itemDataObject.itemdata.description,
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required Name"),
		price: Yup.number().required("Required Price"),
		quantity: Yup.number().required("Required Quantity"),
		category: Yup.string().required("Required Category"),
		description: Yup.string().required("Required Description"),
	});

	const handleSubmit = async (values, actions) => {
		await itemDataObject.updateItemMutation.updateCrudItem({
			id: itemDataObject.itemdata._id,
			name: values.name,
			price: values.price,
			quantity: values.quantity,
			category: values.category,
			description: values.description,
		});

		const selectedCategory = categoriesdata.find(
			(category) => category._id === values.category
		);

		handleChange("UPDATE", {
			id: itemDataObject.itemdata._id,
			name: values.name,
			price: values.price,
			quantity: values.quantity,
			category: selectedCategory,
			description: values.description,
		});

		onClose(null);
	};

	return (
		<ModalContainer>
			<Modal>
				<h1 onClick={() => onClose(null)}>X</h1>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => {
						return (
							<Form>
								<Field
									type="text"
									name="name"
									value={props.values.name}
									className="form-input"
								/>
								<Field
									type="number"
									name="price"
									value={props.values.price}
									className="form-input"
								/>
								<Field
									type="number"
									name="quantity"
									value={props.values.quantity}
									className="form-input"
								/>
								<Field
									as="select"
									name="category"
									value={props.values.category}
									className="form-input"
								>
									{categoriesdata.map((category, index) => (
										<option value={category._id} key={index}>
											{category.name}
										</option>
									))}
								</Field>
								<Field
									type="text"
									name="description"
									value={props.values.description}
									className="form-input"
								/>

								<div className="action-buttons">
									<button type="submit">Update</button>
									<button
										type="button"
										onClick={() => {
											itemDataObject.deleteItemMutation.deleteCrudItem(
												itemDataObject.itemdata._id
											);
										}}
									>
										Delete
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Modal>
		</ModalContainer>
	);
};

export default CrudTableModal;
