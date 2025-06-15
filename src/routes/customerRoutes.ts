import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const customerRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/customers",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/customers/CustomerIndexPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/customers/CustomerCreatePage.tsx"))
			},
			{
				path: ':customer/show',
				Component: lazy(() => import("../components/pages/customers/CustomerShowPage.tsx"))
			},
			{
				path: ':customer/update',
				Component: lazy(() => import("../components/pages/customers/CustomerUpdatePage.tsx"))
			},
		],
	},
]

export default customerRoutes