import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useSidebarStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const productRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/products",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/products/ProductIndexPage.tsx"))
			},
			{
				path: ':product/show',
				Component: lazy(() => import("../components/pages/products/ProductShowPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/products/ProductCreatePage.tsx"))
			},
		],
	},
]

export const useRoutesProduct = () => {
	const navigate = useNavigate();
	const {setSidebar} = useSidebarStore()
	const {user} = useUserStore()
	
	return {
		goToProductIndex: () => {
			setSidebar({field: 'title', value: 'Produits'})
			return navigate(`/${user?.userable.slug}/products`)
		},
		goToProductShow: (product: ProductInterface) => {
			setSidebar({field: 'title', value: 'Détails du produit'})
			return navigate(`/${user?.userable.slug}/products/${product.id}/show`)
		},
		goToProductCreate: () => {
			setSidebar({field: 'title', value: 'Détails du produit'})
			return navigate(`/${user?.userable.slug}/products/create`)
		}
	}
}

export default productRoutes