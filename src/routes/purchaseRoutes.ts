import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

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

export const useRoutesPurchase = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToIndex: () => {
			setSidebar({field: 'title', value: 'Achats'})
			return navigate(`/${user?.userable.slug}/purchases`)
		},
		goToCreate: () => {
			setSidebar({field: 'title', value: 'Nouvel achat'})
			return navigate(`/${user?.userable.slug}/purchases/create`)
		},
		goToShow: ({row, id}: { row?: PurchaseInterface, id?: number }) => {
			if (!id && row) {
				id = row.id
			}
			
			setSidebar({field: 'title', value: 'Détails achat'})
			return navigate(`/${user?.userable.slug}/purchases/${id}/show`)
		},
		goToUpdate: ({row, id}: { row?: PurchaseInterface, id?: number }) => {
			if (!id && row) {
				id = row.id
			}
			
			setSidebar({field: 'title', value: "Mise à jour d'achat"})
			return navigate(`/${user?.userable.slug}/purchases/${id}/update`)
		},
	}
}

export default purchaseRoutes