import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../store/useAppStore.ts";
import {useUserStore} from "../../store/useUserStore.ts";

const useRoutesProduct = () => {
	const navigate = useNavigate();
	const {setSidebar} = useAppStore()
	const {user} = useUserStore()
	
	return {
		goToProductIndex: () => {
			setSidebar({field: 'title', value: 'Produits'})
			return navigate(`/${user?.userable.slug}/products`)
		},
		goToProductShow: (product: ProductInterface) => {
			setSidebar({field: 'title', value: 'Détails de produit'})
			return navigate(`/${user?.userable.slug}/products/${product.id}/show`)
		},
		goToProductCreate: () => {
			setSidebar({field: 'title', value: 'Nouveau produit'})
			return navigate(`/${user?.userable.slug}/products/create`)
		},
		goToEdit: (params: { product?: ProductInterface, id?: number }) => {
			if (!params?.id) {
				params.id = params.product?.id
			}
			
			setSidebar({field: 'title', value: 'Mise à jour de produit'})
			return navigate(`/${user?.userable.slug}/products/${params.id}/update`)
		}
	}
}

export default useRoutesProduct