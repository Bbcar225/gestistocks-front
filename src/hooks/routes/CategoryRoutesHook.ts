import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesCategory = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToCategoryIndex: () => {
			setSidebar({field: 'title', value: 'Catégories'})
			return navigate(`/${user?.userable.slug}/categories`)
		}
	}
}

export default useRoutesCategory