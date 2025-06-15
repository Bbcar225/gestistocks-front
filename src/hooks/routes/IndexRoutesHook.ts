import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesIndex = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToDashboard: () => {
			setSidebar({field: 'title', value: 'Tableau de bord'})
			navigate(`/${user?.userable.slug}/dashboard`)
		},
		goToLogin: () => {
			navigate(`/`)
		},
		goToPos: () => {
			setSidebar({field: 'title', value: 'Système POS'})
			navigate(`/${user?.userable.slug}/pos`)
		}
	}
}

export default useRoutesIndex