import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const warehouseRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/warehouses",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/warehouses/WarehouseIndexPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/warehouses/WarehouseIndexPage.tsx"))
			},
		],
	},
]

export default warehouseRoutes