import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesAccount = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToAccount: () => {
			setSidebar({field: 'title', value: 'Mon compte'})
			return navigate(`/${user?.userable.slug}/account`)
		},
		goToUpdate: () => {
			setSidebar({field: 'title', value: 'Mise à jour du compte'})
			return navigate(`/${user?.userable.slug}/account/update`)
		}
	}
}

export default useRoutesAccount