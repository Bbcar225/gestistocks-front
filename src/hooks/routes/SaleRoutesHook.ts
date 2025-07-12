import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesSale = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToIndex: () => {
			setSidebar({field: 'title', value: 'Ventes'})
			return navigate(`/${user?.userable.slug}/sales`)
		},
		goToShow: ({row, id}: { row?: SaleInterface, id?: number }) => {
			if (!id && row) {
				id = row.id
			}
			
			setSidebar({field: 'title', value: 'Détails vente'})
			return navigate(`/${user?.userable.slug}/sales/${id}/show`)
		},
		goToUpdate: ({row, id}: { row?: SaleInterface, id?: number }) => {
			if (!id && row) {
				id = row.id
			}
			
			setSidebar({field: 'title', value: "Mise à jour de vente"})
			return navigate(`/${user?.userable.slug}/sales/${id}/update`)
		}
	}
}

export default useRoutesSale