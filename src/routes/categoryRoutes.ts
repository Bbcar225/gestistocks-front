import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const categoryRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/categories",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/categories/CategoryIndexPage.tsx"))
			}
		],
	},
]

export default categoryRoutes