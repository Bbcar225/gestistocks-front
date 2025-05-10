import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

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

export const useRoutesSupplier = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToIndex = () => {
		setSidebar({field: 'title', value: 'Fournisseurs'})
		return navigate(`/${user?.userable.slug}/suppliers`)
	}
	
	const goToCreate = () => {
		setSidebar({field: 'title', value: 'Nouveau fournisseur'})
		return navigate(`/${user?.userable.slug}/suppliers/create`)
	}
	
	return {
		goToIndex,
		goToCreate
	}
}

export default supplierRoutes