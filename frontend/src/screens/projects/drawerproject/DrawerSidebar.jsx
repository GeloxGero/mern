import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { useNavigate, Link } from "react-router-dom";

const DrawerSidebar = () => {
	const anchor = "left";
	const navigate = useNavigate();

	const topNavigation = [
		{
			text: "Inbox",
			path: "/projects/drawer/inbox",
		},
		{
			text: "Starred",
			path: "/projects/drawer/starred",
		},
		{
			text: "Send Email",
			path: "/projects/drawer/sendEmail",
		},
		{
			text: "Drafts",
			path: "/projects/drawer/drafts",
		},
	];

	const bottomNavigation = [
		{
			text: "All Mail",
			path: "/projects/drawer/allmail",
		},
		{
			text: "Trash",
			path: "/projects/drawer/trash",
		},
		{
			text: "Spam",
			path: "/projects/drawer/spam",
		},
	];

	return (
		<div>
			<Drawer
				sx={{
					width: 150,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 150,
						boxSizing: "border-box",
					},
				}}
				anchor="left"
				variant="persistent"
				open={true}
			>
				<Box
					sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
					role="presentation"
				>
					<List>
						{topNavigation.map((nav, index) => (
							<Link to={nav.path} className="Link">
								<ListItem key={nav.text} disablePadding className="pointer">
									<ListItemButton>
										<ListItemText primary={nav.text} />
									</ListItemButton>
								</ListItem>
							</Link>
						))}
					</List>
					<Divider />
					<List>
						{bottomNavigation.map((nav, index) => (
							<Link to={nav.path} className="Link">
								<ListItem key={nav.text} disablePadding>
									<ListItemButton>
										<ListItemText primary={nav.text} />
									</ListItemButton>
								</ListItem>
							</Link>
						))}
					</List>
				</Box>
			</Drawer>
		</div>
	);
};

export default DrawerSidebar;
