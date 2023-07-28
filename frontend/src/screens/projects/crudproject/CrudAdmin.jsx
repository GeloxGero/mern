import {
	useGetCrudItemsQuery,
	useDeleteCrudItemMutation,
} from "../../../slices/projectSlices/crudItemSlice";
import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { clearCredentials } from "../../../slices/authSlice";
import {
	faPenToSquare,
	faDeleteLeft,
	faList,
	faCertificate,
} from "@fortawesome/free-solid-svg-icons";

const CrudAdmin = () => {
	const [filter, setFilter] = useState("item");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.auth);

	const [logout] = useLogoutMutation();

	const [deleteCrudItem, { isLoading, isError, isSuccess }] =
		useDeleteCrudItemMutation();

	useEffect(() => {
		if (!userData.userInfo) navigate("/projects/crud");
	}, [userData, navigate]);

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
				<div className="sidebar">
					<div className="buttons">
						<button onClick={() => setFilter("category")}>
							<FontAwesomeIcon icon={faCertificate} /> <h4>Categories</h4>
						</button>
						<button onClick={() => setFilter("item")}>
							<FontAwesomeIcon icon={faList} />
							<h4>Items</h4>
						</button>

						<div className="navigate">
							<button
								onClick={() => {
									navigate("/projects/crud/addcategory");
								}}
							>
								Add Category
							</button>
							<button
								onClick={() => {
									navigate("/projects/crud/deletecategory");
								}}
							>
								Delete Category
							</button>
							<button
								onClick={async () => {
									await logout().unwrap();
									dispatch(clearCredentials());

									navigate("/projects/crud");
								}}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
				{filter === "item" ? (
					<table>
						<thead>
							<tr className="item-table">
								<th>Name</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Category</th>
								<th>Delete</th>
								<th>Update</th>
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
										<td className="single-item">
											<button
												onClick={async function () {
													await deleteCrudItem({ id: item._id });
												}}
											>
												<FontAwesomeIcon icon={faDeleteLeft} />
											</button>
										</td>
										<td className="single-item">
											<button
												onClick={() => {
													navigate("/projects/crud/update", {
														state: {
															data: item,
														},
													});
												}}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<table>
						<thead>
							<tr className="item-table">
								<th>Name</th>
								<th>Category</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => {
								return (
									<tr className="item-table" key={index}>
										<td className="single-item">{item.name}</td>
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
				)}

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

export default CrudAdmin;
