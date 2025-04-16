import {useEffect} from "react";
import {useSidebarStore} from "../../../store/useAppStore.ts";
import {Row} from "antd";

export default function ProductIndexPage() {
	const {setSidebar} = useSidebarStore()
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Détails du produit'})
	}, [setSidebar]);
	
	return <Row>
	</Row>
}