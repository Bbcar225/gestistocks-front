import {RouteObject, useNavigate} from "react-router-dom";
import {lazy} from "react";
import {GuestLayout} from "../components/templates/GuestLayout.tsx";
import NotFoundPage from "../components/pages/NotFoundPage.tsx";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import unitRoutes from "./unitRoutes.ts";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";
import categoryRoutes from "./categoryRoutes.ts";
import galleryRoutes from "./galleryRoutes.ts";
import productRoutes from "./productRoutes.ts";
import warehouseRoutes from "./warehouseRoutes.ts";
import supplierRoutes from "./supplierRoutes.ts";
import purchaseRoutes from "./purchaseRoutes.ts";

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
	...unitRoutes,
	...categoryRoutes,
	...galleryRoutes,
	...productRoutes,
	...warehouseRoutes,
	...supplierRoutes,
	...purchaseRoutes,
]

export const useRoutesIndex = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToDashboard = () => {
		setSidebar({field: 'title', value: 'Tableau de bord'})
		navigate(`/${user?.userable.slug}/dashboard`)
	}
	
	const goToLogin = () => {
		navigate(`/`)
	}
	
	return {
		goToDashboard,
		goToLogin
	}
}

export default index;
