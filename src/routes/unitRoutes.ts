import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const unitRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/units",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/units/UnitIndexPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/units/UnitCreatePage.tsx"))
			},
		],
	},
]

export default unitRoutes