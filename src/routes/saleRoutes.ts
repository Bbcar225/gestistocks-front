import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const saleRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/sales",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/sales/SaleIndexPage.tsx"))
			},
			{
				path: ':sale/show',
				Component: lazy(() => import("../components/pages/sales/SaleShowPage.tsx"))
			},
		],
	},
]

export default saleRoutes