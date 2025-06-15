import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesWarehouse = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToIndex = () => {
		setSidebar({field: 'title', value: 'Dépôts'})
		return navigate(`/${user?.userable.slug}/warehouses`)
	}
	
	const goToCreate = () => {
		setSidebar({field: 'title', value: 'Nouveau dépôt'})
		return navigate(`/${user?.userable.slug}/warehouses/create`)
	}
	
	return {
		goToIndex,
		goToCreate
	}
}

export default useRoutesWarehouse