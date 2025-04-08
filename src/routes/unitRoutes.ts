import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useSidebarStore} from "../store/useAppStore.ts";

const unitRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/units",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/units/UnitIndexPage.tsx"))
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
]

export const useUnitRoutes = () => {
	const navigate = useNavigate();
	const {setSidebar} = useSidebarStore()
	
	const goToUnitIndex = () => {
		setSidebar({field: 'title', value: 'Unités'})
		return navigate('/123/units')
	}
	
	return {
		goToUnitIndex
	}
}

export default unitRoutes