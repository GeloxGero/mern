import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleUser,
	faStore,
	faGear,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = styled.div`
	height: 100vh;
	width: 5vw;

	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;

	position: absolute;
	top: 0;
	left: 0;

	background: #202831;

	box-shadow: 0 2px 20px 2px black;

	.icon-container {
		width: 5vw;
		height: 5vw;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

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
`;

const CrudSidebar = () => {
	return (
		<Sidebar>
			<div className="icon-container">
				<FontAwesomeIcon icon={faCircleUser} className="sidebar-icon" />
				<p>Profile</p>
			</div>

			<br />
			<div className="icon-container">
				<FontAwesomeIcon icon={faStore} className="sidebar-icon" />
				<p>Store</p>
			</div>
			<div className="icon-container">
				<FontAwesomeIcon icon={faGear} className="sidebar-icon" />
				<p>Settings</p>
			</div>
			<div className="icon-container">
				<FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
				<p>Logout</p>
			</div>
		</Sidebar>
	);
};

export default CrudSidebar;
