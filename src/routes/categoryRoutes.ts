import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const categoryRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/categories",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/categories/CategoryIndexPage.tsx"))
			}
		],
	},
]

export const useRoutesCategory = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToCategoryIndex: () => {
			setSidebar({field: 'title', value: 'Unités'})
			return navigate(`/${user?.userable.slug}/categories`)
		}
	}
}

export default categoryRoutes