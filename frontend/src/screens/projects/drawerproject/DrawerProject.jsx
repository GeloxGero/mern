import React from "react";

import { Outlet } from "react-router-dom";
import DrawerSidebar from "./DrawerSidebar";
import DrawerAllMail from "./endpoints/DrawerAllMail";
import DrawerDrafts from "./endpoints/DrawerDrafts";
import DrawerInbox from "./endpoints/DrawerInbox";
import DrawerSendEmail from "./endpoints/DrawerSendEmail";
import DrawerSpam from "./endpoints/DrawerSpam";
import DrawerStarred from "./endpoints/DrawerStarred";
import DrawerTrash from "./endpoints/DrawerTrash";
import DrawerDash from "./DrawerDash";

const DrawerProject = () => {
	return (
		<div>
			<DrawerSidebar />
			<Outlet />
		</div>
	);
};

export {
	DrawerProject,
	DrawerAllMail,
	DrawerDrafts,
	DrawerInbox,
	DrawerSendEmail,
	DrawerSpam,
	DrawerStarred,
	DrawerTrash,
	DrawerDash,
};
