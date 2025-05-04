import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

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

export const useRoutesWarehouse = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToIndex = () => {
		setSidebar({field: 'title', value: 'Dépôts'})
		return navigate(`/${user?.userable.slug}/warehouses`)
	}
	
	const goToCreate = () => {
		setSidebar({field: 'title', value: 'Nouveau dépôt'})
		return navigate(`/${user?.userable.slug}/warehouses/create`)
	}
	
	return {
		goToIndex,
		goToCreate
	}
}

export default warehouseRoutes