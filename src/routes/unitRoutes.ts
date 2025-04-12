import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useSidebarStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

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
	const {user} = useUserStore()
	
	const goToUnitIndex = () => {
		setSidebar({field: 'title', value: 'Unités'})
		return navigate(`/${user?.userable.slug}/units`)
	}
	
	return {
		goToUnitIndex
	}
}

export default unitRoutes