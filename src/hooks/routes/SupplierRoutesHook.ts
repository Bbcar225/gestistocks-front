import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesSupplier = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	const goToIndex = () => {
		setSidebar({field: 'title', value: 'Fournisseurs'})
		return navigate(`/${user?.userable.slug}/suppliers`)
	}
	
	const goToCreate = () => {
		setSidebar({field: 'title', value: 'Nouveau fournisseur'})
		return navigate(`/${user?.userable.slug}/suppliers/create`)
	}
	
	return {
		goToIndex,
		goToCreate
	}
}

export default useRoutesSupplier