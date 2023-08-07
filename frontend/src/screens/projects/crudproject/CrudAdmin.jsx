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
import { faList, faCertificate } from "@fortawesome/free-solid-svg-icons";
import CrudTable from "./CrudTable";
import CrudSidebar from "./CrudSidebar";
import styled from "styled-components";

const AdminContainer = styled.div`
	height: 100vh;
	width: 100vw;

	background-color: #3f4259;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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
		const newItems = items.map((item) => ({
			...item,
			category: categories.find((category) => {
				return item.category === category._id;
			}),
		}));

		// content = (
		// 	<div className="items-container flex">
		// 		<div className="sidebar">
		// 			<div className="buttons">
		// 				<button onClick={() => setFilter("category")}>
		// 					<FontAwesomeIcon icon={faCertificate} /> <h4>Categories</h4>
		// 				</button>
		// 				<button onClick={() => setFilter("item")}>
		// 					<FontAwesomeIcon icon={faList} />
		// 					<h4>Items</h4>
		// 				</button>

		// 				<div className="navigate">
		// 					<button
		// 						onClick={() => {
		// 							navigate("/projects/crud/addcategory");
		// 						}}
		// 					>
		// 						Add Category
		// 					</button>
		// 					<button
		// 						onClick={() => {
		// 							navigate("/projects/crud/deletecategory");
		// 						}}
		// 					>
		// 						Delete Category
		// 					</button>
		// 					<button
		// 						onClick={async () => {
		// 							await logout().unwrap();
		// 							dispatch(clearCredentials());

		// 							navigate("/projects/crud");
		// 						}}
		// 					>
		// 						Logout
		// 					</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<CrudTable data={newItems} />
		// 		<button
		// 			className="add-button"
		// 			onClick={(e) => {
		// 				e.preventDefault();
		// 				navigate("/projects/crud/add");
		// 			}}
		// 		>
		// 			Add Item
		// 		</button>
		// 	</div>
		// );

		content = (
			<AdminContainer>
				<CrudSidebar />
				<CrudTable data={newItems} />
			</AdminContainer>
		);
	}

	return content;
};

export default CrudAdmin;
