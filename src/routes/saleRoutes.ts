import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const saleRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/sales",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/sales/SaleIndexPage.tsx"))
			},
			{
				path: ':purchase/show',
				Component: lazy(() => import("../components/pages/sales/SaleShowPage.tsx"))
			},
		],
	},
]

export const useRoutesSale = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToIndex: () => {
			setSidebar({field: 'title', value: 'Ventes'})
			return navigate(`/${user?.userable.slug}/sales`)
		},
		goToShow: ({row, id}: { row?: PurchaseInterface, id?: number }) => {
			if (!id && row) {
				id = row.id
			}
			
			setSidebar({field: 'title', value: 'Détails vente'})
			return navigate(`/${user?.userable.slug}/sales/${id}/show`)
		},
	}
}

export default saleRoutes