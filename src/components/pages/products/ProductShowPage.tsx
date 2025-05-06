import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Row} from "antd";
import {useParams} from "react-router-dom";
import {useProductGetOne} from "../../../hooks/Api/tenant/ProductHookAPI.ts";
import {useProductStore} from "../../../store/useProductStore.ts";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	const {product: productId} = useParams()
	const reqProductGetOne = useProductGetOne({
		id: productId
	})
	const {product, setProduct} = useProductStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: `Détails du produit : ${product?.name}`});
	}, [product, setSidebar]);
	
	useEffect(() => {
		if (reqProductGetOne.status === 'success') {
			const res = reqProductGetOne.data
			const product = res.data
			setProduct(product)
		}
	}, [reqProductGetOne.status, reqProductGetOne.data]);
	
	return <Row>
	</Row>
}