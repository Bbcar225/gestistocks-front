import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const supplyRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/supplies",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/supplies/SupplyIndexPage.tsx"))
			},
		],
	},
]

export const useRoutesSupply = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToIndex = () => {
		setSidebar({field: 'title', value: 'Fournisseurs'})
		return navigate(`/${user?.userable.slug}/supplies`)
	}
	
	const goToCreate = () => {
		setSidebar({field: 'title', value: 'Nouveau fournisseur'})
		return navigate(`/${user?.userable.slug}/supplies/create`)
	}
	
	return {
		goToIndex,
		goToCreate
	}
}

export default supplyRoutes