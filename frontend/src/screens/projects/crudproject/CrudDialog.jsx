import React, { useRef } from "react";

const CrudDialog = ({ data, setData }) => {
	const reference = useRef(null);
	console.log(data);

	return (
		<dialog ref={reference} open>
			<p>Name: {data.name}</p>
			<p>Price: {data.price}</p>
			<p>Category: {data.category}</p>
			<p>Quantity: {data.quantity}</p>
			<p>Description: {data.description}</p>

			<button
				onClick={() => {
					reference.current.close();
					setData({});
				}}
			>
				Close
			</button>
		</dialog>
	);
};

export default CrudDialog;
