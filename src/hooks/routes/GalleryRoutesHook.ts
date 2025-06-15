import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesGallery = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToGalleryIndex: () => {
			setSidebar({field: 'title', value: 'Galléries'})
			return navigate(`/${user?.userable.slug}/galleries`)
		}
	}
}

export default useRoutesGallery