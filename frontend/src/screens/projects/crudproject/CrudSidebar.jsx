import styled from "styled-components";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { clearCredentials } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCompass,
	faStore,
	faGear,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = styled.div`
	margin-top: 1vh;
	margin-left: 0.5vw;
	height: 98vh;
	width: 80px;

	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;

	position: fixed;
	top: 0;
	left: 0;

	background: #32344b;

	border: black 0.5px solid;
	border-radius: 20px;

	.icon-container {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #252323;

		padding-bottom: 20px;
	}

	.icon-container:hover {
		cursor: pointer;
		background-color: #191e24;

		.sidebar-icon,
		p {
			color: #3ea5f2;
		}
	}

	.sidebar-icon {
		font-size: 1.8em;
		padding-top: 20px;
		color: #68727b;
	}

	.sidebar-icon:hover {
		cursor: pointer;
	}

	p {
		padding-top: 6px;
		font-size: 0.79em;
		color: #68727b;
	}

	.line {
		padding: 50px 0;
		height: 0px;
		width: 80px;
		border-bottom: solid 1px black;
	}
`;

const CrudSidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [logout] = useLogoutMutation();

	const handleLogout = async () => {
		await logout().unwrap();
		dispatch(clearCredentials());
	};

	return (
		<Sidebar>
			<div className="icon-container">
				<FontAwesomeIcon icon={faCompass} className="sidebar-icon" />
				<p>Discover</p>
			</div>

			<div className="icon-container">
				<FontAwesomeIcon icon={faStore} className="sidebar-icon" />
				<p>Store</p>
			</div>

			<div className="line"></div>

			<div className="icon-container">
				<FontAwesomeIcon icon={faGear} className="sidebar-icon" />
				<p>Settings</p>
			</div>
			<div className="icon-container" onClick={handleLogout}>
				<FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
				<p>Logout</p>
			</div>
		</Sidebar>
	);
};

export default CrudSidebar;
