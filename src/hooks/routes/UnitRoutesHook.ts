import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesUnit = () => {
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

export default useRoutesUnit