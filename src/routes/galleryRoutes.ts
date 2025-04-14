import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useSidebarStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const galleryRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/galleries",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/galleries/GalleryIndexPage.tsx"))
			}
		],
	},
]

export const useRoutesGallery = () => {
	const navigate = useNavigate();
	const {setSidebar} = useSidebarStore()
	const {user} = useUserStore()
	
	return {
		goToGalleryIndex: () => {
			setSidebar({field: 'title', value: 'Galléries'})
			return navigate(`/${user?.userable.slug}/galleries`)
		}
	}
}

export default galleryRoutes