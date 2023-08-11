import { useGetCrudItemsQuery } from "../../../slices/projectSlices/crudItemSlice";
import { useGetCrudCategoriesQuery } from "../../../slices/projectSlices/crudCategorySlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudProductCards from "./CrudProductCards";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CrudSidebar from "./CrudSidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faCartShopping,
	faComment,
	faBell,
	faUser,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const PublicPage = styled.div`
	width: 100vw;
	min-height: 100vh;

	background-color: #3f4259;

	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
`;

const Section = styled.div`
	width: 80vw;
	height: 1000px;

	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	border-radius: 15px;

	background: #31344b;

	.highlight {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-between;
		padding: 0 100px;
		align-items: center;
	}

	.highlight .explore {
		background: #79829a;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 15px;
		padding: 10px;
		gap: 10px;
	}
`;

const TopContainer = styled.div`
	height: 120px;
	background: none;
	width: 90vw;

	align-self: end;

	display: flex;
	justify-content: end;
	align-items: center;

	div {
		width: 200px;
		height: 50px;
		background: #31344b;
		margin: 0 20px;
		border-radius: 15px;
	}

	div:hover {
		cursor: pointer;
	}

	.search {
		display: flex;
		width: 500px;
		align-items: center;
		justify-content: start;
		margin-right: 400px;
	}

	.search .icon {
		padding-left: 20px;
		padding-right: 20px;
	}

	.cart,
	.actions,
	.profile {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cart,
	.actions {
		width: 50px;
		height: 50px;
		font-size: 1.9em;
	}

	.cart {
		margin-right: 200px;
	}

	.profile {
		justify-content: start;
		width: 300px;
		height: 50px;
		margin-right: 200px;
		margin-left: 250px;
	}

	.profile .icon {
		padding-left: 15px;
		font-size: 1.9em;
		padding-right: 40px;
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
				<TopContainer>
					<div className="search">
						<FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
						<p>Search for Product</p>
					</div>
					<div className="cart">
						<FontAwesomeIcon icon={faCartShopping} className="icon" />
					</div>
					<div className="actions">
						<FontAwesomeIcon icon={faComment} className="icon" />
					</div>
					<div className="actions">
						<FontAwesomeIcon icon={faBell} className="icon" />
					</div>
					<div className="profile">
						<FontAwesomeIcon icon={faUser} className="icon" />
						<h3>Current User</h3>
					</div>
				</TopContainer>
				<CrudSidebar />

				<Section>
					<div className="highlight">
						<h1>Most Popular</h1>
						<div className="explore">
							<h4>Explore</h4>
							<FontAwesomeIcon icon={faArrowRight} className="icon" />
						</div>
					</div>
					<CrudProductCards data={newItems} />
				</Section>
			</PublicPage>
		);
	}

	return content;
};

export default CrudPublic;
