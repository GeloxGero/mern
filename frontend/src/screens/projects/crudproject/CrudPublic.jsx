import { useGetCrudItemsQuery } from "../../../slices/projectSlices/crudItemSlice";
import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudProductCards from "./CrudProductCards";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PublicPage = styled.div`
	width: 100vw;
	min-height: 100vh;

	background-color: #3f4259;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Navbar = styled.nav`
	display: flex;
	align-items: end;
	justify-content: end;
	height: 250px;
	max-width: 1350px;
	margin: 0 auto;
	padding-bottom: 8px;

	.navigate {
		font-size: 2em;
		text-decoration: none;
		color: #acb212;
		padding-left: 20px;
	}
`;

const CrudPublic = () => {
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth);

	useEffect(() => {
		if (userData.userInfo !== null) {
			navigate("/projects/crud/admin");
		}
	}, [navigate, userData]);

	const {
		data: categories,
		isLoading: categoriesLoading,
		isSuccess: categoriesSuccess,
	} = useGetCrudCategoriesQuery();

	const {
		data: items,
		isLoading: itemsLoading,
		isSuccess: itemsSuccess,
	} = useGetCrudItemsQuery();

	let content;

	if (itemsLoading || categoriesLoading) content = <h1>Loading...</h1>;

	if (itemsSuccess && categoriesSuccess) {
		//get specific category from the category id stored in item
		//replace category id with category object
		const newItems = items.map((item) => ({
			...item,
			category: categories.find((category) => {
				return item.category === category._id;
			}),
		}));

		content = (
			<PublicPage>
				<Navbar>
					<Link className="navigate" to="login">
						Login
					</Link>
					<Link className="navigate" to="register">
						Register
					</Link>
				</Navbar>
				<CrudProductCards data={newItems} />
			</PublicPage>
		);
	}

	return content;
};

export default CrudPublic;
