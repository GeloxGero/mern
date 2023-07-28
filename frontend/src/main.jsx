import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import ProjectsLayout from "./layouts/ProjectsLayout.jsx";
import Projects from "./screens/projects/Projects.jsx";
import Dashboard from "./screens/dashboard/Dashboard.jsx";

import {
	DrawerProject,
	DrawerAllMail,
	DrawerDrafts,
	DrawerInbox,
	DrawerSendEmail,
	DrawerSpam,
	DrawerStarred,
	DrawerTrash,
	DrawerDash,
} from "./screens/projects/drawerproject/DrawerProject.jsx";

import CrudProject from "./screens/projects/crudproject/CrudProject.jsx";
import CrudLayout from "./layouts/projects/crud/CrudLayout.jsx";
import CrudUpdate from "./screens/projects/crudproject/CrudUpdate.jsx";
import CrudNewItem from "./screens/projects/crudproject/CrudNewItem.jsx";
import CrudNewCategory from "./screens/projects/crudproject/CrudNewCategory.jsx";
import CrudDeleteCategory from "./screens/projects/crudproject/CrudDeleteCategory.jsx";
import CrudPublic from "./screens/projects/crudproject/CrudPublic.jsx";
import CrudAdmin from "./screens/projects/crudproject/CrudAdmin.jsx";
import CrudLogin from "./screens/projects/crudproject/CrudLogin.jsx";
import CrudRegister from "./screens/projects/crudproject/CrudRegister.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Dashboard />} />

			<Route path="projects" element={<ProjectsLayout />}>
				<Route index element={<Projects />} />
				<Route path="drawer" element={<DrawerProject />}>
					<Route index element={<DrawerDash />} />
					<Route path="trash" element={<DrawerTrash />} />
					<Route path="starred" element={<DrawerStarred />} />
					<Route path="spam" element={<DrawerSpam />} />
					<Route path="sendEmail" element={<DrawerSendEmail />} />
					<Route path="inbox" element={<DrawerInbox />} />
					<Route path="drafts" element={<DrawerDrafts />} />
					<Route path="allmail" element={<DrawerAllMail />} />
				</Route>

				<Route path="crud" element={<CrudLayout />}>
					<Route index element={<CrudPublic />} />

					<Route path="admin" element={<CrudAdmin />} />
					<Route path="update" element={<CrudUpdate />} />
					<Route path="add" element={<CrudNewItem />} />
					<Route path="addcategory" element={<CrudNewCategory />} />
					<Route path="deletecategory" element={<CrudDeleteCategory />} />
					<Route path="login" element={<CrudLogin />} />
					<Route path="register" element={<CrudRegister />} />
				</Route>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
