import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesCustomer = () => {
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

export default useRoutesCustomer