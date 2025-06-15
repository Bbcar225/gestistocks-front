import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const purchaseRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/purchases",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/purchases/PurchaseIndexPage.tsx"))
			},
			{
				path: ':purchase/show',
				Component: lazy(() => import("../components/pages/purchases/PurchaseShowPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/purchases/PurchaseCreatePage.tsx"))
			},
			{
				path: ':purchase/update',
				Component: lazy(() => import("../components/pages/purchases/PurchaseUpdatePage.tsx"))
			},
		],
	},
]

export default purchaseRoutes