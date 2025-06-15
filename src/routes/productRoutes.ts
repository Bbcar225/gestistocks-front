import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

const productRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/products",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/products/ProductIndexPage.tsx"))
			},
			{
				path: ':product/show',
				Component: lazy(() => import("../components/pages/products/ProductShowPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/products/ProductCreatePage.tsx"))
			},
			{
				path: ':product/update',
				Component: lazy(() => import("../components/pages/products/ProductUpdatePage.tsx"))
			},
		],
	},
]

export default productRoutes