import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
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
				Component: lazy(() => import("../components/pages/units/UnitCreatePage.tsx"))
			},
		],
	},
]

export const useRoutesUnit = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToUnitIndex = () => {
		setSidebar({field: 'title', value: 'Unités'})
		return navigate(`/${user?.userable.slug}/units`)
	}
	
	const goToCreateUnit = () => {
		setSidebar({field: 'title', value: 'Nouvelle unité'})
		return navigate(`/${user?.userable.slug}/units/create`)
	}
	
	return {
		goToUnitIndex,
		goToCreateUnit
	}
}

export default unitRoutes