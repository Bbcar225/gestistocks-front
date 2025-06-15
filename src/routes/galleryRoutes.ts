import {RouteObject} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";

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

export default galleryRoutes