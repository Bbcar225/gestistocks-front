import {RouteObject} from "react-router-dom";
import {lazy} from "react";
import {GuestLayout} from "../components/templates/GuestLayout.tsx";
import NotFoundPage from "../components/pages/NotFoundPage.tsx";
import AuthLayout from "../components/templates/AuthLayout.tsx";

const index: RouteObject[] = [
	{
		path: "/",
		Component: GuestLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/HomePage.tsx"))
			},
		],
	},
	{
		path: "/:tenant_slug/dashboard",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/DashboardPage.tsx"))
			},
		],
	},
	{
		path: ":tenant_slug/purchases",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/purchases/PurchaseIndexPage"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/purchases/PurchaseCreatePage.tsx"))
			},
			{
				path: ':purchase',
				children: [
					{
						index: true,
						Component: lazy(() => import("../components/pages/purchases/PurchaseShowPage.tsx"))
					},
					{
						path: 'edit',
						Component: lazy(() => import("../components/pages/purchases/PurchaseEditPage.tsx.tsx"))
					}
				]
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage/>,
	},
]

export default index;
