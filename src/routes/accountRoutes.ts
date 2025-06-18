import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const accountRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/account",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/account/AccountPage.tsx"))
			},
			{
				path: 'update',
				Component: lazy(() => import("../components/pages/account/AccountUpdatePage.tsx"))
			},
		],
	},
]

export default accountRoutes