import {RouteObject, useNavigate} from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout.tsx";
import {lazy} from "react";
import {useAppStore} from "../store/useAppStore.ts";
import {useUserStore} from "../store/useUserStore.ts";

const customerRoutes: RouteObject[] = [
	{
		path: ":tenant_slug/customers",
		Component: AuthLayout,
		children: [
			{
				index: true,
				Component: lazy(() => import("../components/pages/customers/CustomerIndexPage.tsx"))
			},
			{
				path: 'create',
				Component: lazy(() => import("../components/pages/customers/CustomerCreatePage.tsx"))
			},
			{
				path: ':customer/show',
				Component: lazy(() => import("../components/pages/customers/CustomerShowPage.tsx"))
			},
			{
				path: ':customer/update',
				Component: lazy(() => import("../components/pages/customers/CustomerUpdatePage.tsx"))
			},
		],
	},
]

export const useRoutesCustomer = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToIndex: () => {
			setSidebar({field: 'title', value: 'Clients'})
			return navigate(`/${user?.userable.slug}/customers`)
		},
		goToCreate: () => {
			setSidebar({field: 'title', value: 'Nouveau client'})
			return navigate(`/${user?.userable.slug}/customers/create`)
		},
		goToUpdate: ({customer, id}: { customer?: CustomerInterface, id?: number }) => {
			if (!id && customer) {
				id = customer.id
			}
			
			setSidebar({field: 'title', value: 'Mise à jour de client'})
			return navigate(`/${user?.userable.slug}/customers/${id}/update`)
		},
		goToShow: ({customer, id}: { customer?: CustomerInterface, id?: number }) => {
			if (!id && customer) {
				id = customer.id
			}
			
			setSidebar({field: 'title', value: 'Détails de client'})
			return navigate(`/${user?.userable.slug}/customers/${id}/show`)
		},
	}
}

export default customerRoutes