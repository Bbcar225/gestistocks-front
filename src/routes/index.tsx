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
import customerRoutes from "./customerRoutes.ts";
import saleRoutes from "./saleRoutes.ts";

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
		path: "/:tenant_slug/pos",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/PosPage.tsx"))
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
	...customerRoutes,
	...saleRoutes,
]

export const useRoutesIndex = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToDashboard: () => {
			setSidebar({field: 'title', value: 'Tableau de bord'})
			navigate(`/${user?.userable.slug}/dashboard`)
		},
		goToLogin: () => {
			navigate(`/`)
		},
		goToPos: () => {
			setSidebar({field: 'title', value: 'Système POS'})
			navigate(`/${user?.userable.slug}/pos`)
		}
	}
}

export default index;
