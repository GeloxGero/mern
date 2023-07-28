import {
	useGetCrudItemsQuery,
	useDeleteCrudItemMutation,
} from "../../../slices/projectSlices/crudItemSlice";
import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CrudPublic = () => {
	const [filter, setFilter] = useState("item");
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth);

	useEffect(() => {
		if (userData.userInfo !== null) {
			navigate("/projects/crud/admin");
		}
	}, [navigate, userData]);

	const [deleteCrudItem, { isLoading, isError, isSuccess }] =
		useDeleteCrudItemMutation();

	const {
		data: categories,
		isLoading: categoriesLoading,
		isSuccess: categoriesSuccess,
		isError: categoriesIsError,
		error: categoriesError,
	} = useGetCrudCategoriesQuery();

	const {
		data: items,
		isLoading: itemsLoading,
		isSuccess: itemsSuccess,
		isError: itemsIsError,
		error: itemsError,
	} = useGetCrudItemsQuery();

	let content;

	if (itemsLoading || categoriesLoading) content = <h1>Loading...</h1>;

	if (itemsSuccess && categoriesSuccess) {
		content = (
			<div className="items-container flex">
				<table>
					<thead>
						<tr className="item-table">
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item, index) => {
							return (
								<tr className="item-table" key={index}>
									<td className="single-item">{item.name}</td>
									<td className="single-item">{item.quantity}</td>
									<td className="single-item">{item.price}</td>
									<td className="single-item">
										{
											categories.filter(
												(category) => category._id === item.category
											)[0].name
										}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<button
					className="add-button"
					onClick={(e) => {
						e.preventDefault();
						navigate("/projects/crud/add");
					}}
				>
					Add Item
				</button>
			</div>
		);
	}

	return content;
};

export default CrudPublic;
