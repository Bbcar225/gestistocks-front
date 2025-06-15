import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const supplierRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/suppliers",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/suppliers/SupplierIndexPage.tsx"))
			},
		],
	},
]

export default supplierRoutes