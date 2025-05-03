import {useEffect} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Row} from "antd";

export default function ProductIndexPage() {
	const {setSidebar} = useAppStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Détails du produit'})
	}, [setSidebar]);
	
	return <Row>
	</Row>
}